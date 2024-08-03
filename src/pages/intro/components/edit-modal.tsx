import { Modal } from "antd";
import { memo, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Wrapper } from "./edit-modal.styled";
import {
	Alert,
	Button,
	TextField,
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import ImageUploading from "react-images-uploading";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { PhotoView } from "react-photo-view";
import { useUpdateIntroductionById } from "../../../hooks/useIntro";
import { useUploadImage } from "../../../hooks/useUpload";

interface IEditModalProps {
	open: boolean;
	onClose: () => void;
	item: any;
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video",
];

const EditModalComponent = ({ open, onClose, item }: IEditModalProps) => {
	const quillRef = useRef<any>();
	const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
	const [error, setError] = useState("");
	const { mutateAsync: updateIntroduction, isPending } =
		useUpdateIntroductionById();
	const {
		register,
		setValue,
		trigger,
		getValues,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: item?.title,
			description: item?.description,
			image: item?.image,
			banner: item?.banner,
			content: item?.content,
			isActive: item?.isActive,
		},
	});

	const [images, setImages] = useState<any>([]);
	const [banner, setBanner] = useState<any>([]);
	const maxNumber = 1;

	const handleClose = () => {
		reset();
		setImages([]);
		setBanner([]);
		onClose();
		setError("");
		console.log(getValues());
	};

	const onChange = (imageList: any) => {
		// data for submit
		setImages(imageList);
		setValue("image", imageList?.[0]?.data_url);
	};

	const onChangeBanner = (imageList: any) => {
		// data for submit
		setBanner(imageList);
		setValue("banner", imageList?.[0]?.data_url);
	};

	useEffect(() => {
		setValue("title", item?.title);
		setValue("description", item?.description);
		setValue("image", item?.image);
		setImages([{ data_url: item?.image }] as any);
		setValue("banner", item?.banner);
		setBanner([{ data_url: item?.banner }] as any);
		setValue("content", item?.content);
		setValue("isActive", item?.isActive);
	}, [getValues, item, setValue]);

	const handleSubmit = async () => {
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		const image = getValues("image");
		const content = getValues("content");
		if (!image) {
			setError("Vui lòng upload ảnh tiêu đề.");
			return;
		}
		if (banner.length === 0) {
			setError("Vui lòng upload ảnh banner.");
			return;
		}
		if (!content) {
			setError("Vui lòng nhập nội dung giới thiệu.");
			return;
		}
		const values: any = getValues();
		const slug = values.title
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/đ/g, "d")
			.replace(/Đ/g, "D")
			.replaceAll(" ", "-")
			.toLowerCase();

		if (images?.[0]?.file) {
			const res = await uploadImage(images?.[0]?.file);
			const resBanner = await uploadImage(banner?.[0]?.file);

			await updateIntroduction({
				id: item.id,
				title: values.title,
				description: values.description,
				slug,
				image: res?.data?.url,
				banner: resBanner?.data?.url,
				content,
				isActive: values.isActive,
			} as any);
		} else {
			await updateIntroduction({
				id: item.id,
				title: values.title,
				description: values.description,
				slug,
				image: image,
				banner: getValues("banner"),
				content,
				isActive: values.isActive,
			} as any);
		}

		handleClose();
	};

	const imageHandler = useCallback(() => {
		const input: any = document.createElement("input");
		input.setAttribute("type", "file");
		input.click();

		input.onchange = async () => {
			const file = input?.files?.[0];
			const quillObj = quillRef?.current?.getEditor();
			const range = quillObj?.getSelection();
			try {
				const res = await uploadImage(file);
				quillObj?.editor?.insertEmbed(range?.index, "image", res?.data?.url);
				setValue(
					"content",
					document.querySelector(".ql-editor")?.innerHTML as string
				);
			} catch (err) {
				console.log("Storage err: ", err);
			}
		};
	}, [uploadImage, setValue]);

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: "1" }, { header: "2" }, { font: [] }],
					[{ size: [] }],
					["bold", "italic", "underline", "strike", "blockquote"],
					[
						{ list: "ordered" },
						{ list: "bullet" },
						{ indent: "-1" },
						{ indent: "+1" },
					],
					["link", "image", "video"],
					["clean"],
				],
				handlers: { image: () => imageHandler() },
			},
		}),
		[imageHandler]
	);

	const content = watch("content");

	return (
		<Modal
			destroyOnClose
			title={`Chỉnh sửa giới thiệu ${item?.id}`}
			open={open}
			onCancel={handleClose}
			footer={null}
			width={1000}
		>
			<Wrapper>
				<TextField
					className="title-text"
					fullWidth
					label="Tiêu đề"
					{...register("title", { required: true })}
					size="small"
					error={!!errors.title}
					helperText={errors.title ? "Vui lòng nhập tiêu đề" : ""}
				/>
				<TextField
					fullWidth
					style={{ marginTop: "10px" }}
					label="Mô tả"
					{...register("description", {
						required: true,
					})}
					size="small"
					error={!!errors.description}
					helperText={errors.description ? "Vui lòng nhập mô tả" : ""}
				/>
				<ImageUploading
					multiple
					value={images}
					onChange={onChange}
					maxNumber={maxNumber}
					dataURLKey="data_url"
				>
					{({
						imageList,
						onImageUpload,
						onImageRemoveAll,
						onImageUpdate,
						onImageRemove,
						isDragging,
						dragProps,
					}) => {
						console.log(onImageRemoveAll, onImageUpdate);
						return (
							// write your building UI
							<div className="upload__image-wrapper">
								<span className="label-uploader">Ảnh tiêu đề</span>
								{images.length < maxNumber && (
									<button
										className="update"
										style={isDragging ? { color: "red" } : undefined}
										onClick={onImageUpload}
										{...dragProps}
									>
										Click hoặc thả ảnh vào đây
									</button>
								)}
								{imageList.map((image, index) => (
									<div key={index} className="image-item">
										<PhotoView src={image["data_url"]}>
											<img
												src={image["data_url"]}
												alt=""
												style={{ width: 150, height: 150, objectFit: "cover" }}
											/>
										</PhotoView>

										<div className="image-item__btn-wrapper">
											<Button
												color="error"
												onClick={() => onImageRemove(index)}
											>
												Remove
											</Button>
										</div>
									</div>
								))}
							</div>
						);
					}}
				</ImageUploading>
				<ImageUploading
					multiple
					value={banner}
					onChange={onChangeBanner}
					maxNumber={maxNumber}
					dataURLKey="data_url"
				>
					{({
						imageList,
						onImageUpload,
						onImageRemoveAll,
						onImageUpdate,
						onImageRemove,
						isDragging,
						dragProps,
					}) => {
						console.log(onImageRemoveAll, onImageUpdate);
						return (
							// write your building UI
							<div className="upload__image-wrapper">
								<span className="label-uploader">Banner</span>
								{banner.length < maxNumber && (
									<button
										className="update"
										style={isDragging ? { color: "red" } : undefined}
										onClick={onImageUpload}
										{...dragProps}
									>
										Click hoặc thả ảnh vào đây
									</button>
								)}
								{imageList.map((image, index) => (
									<div
										style={{ width: "100%" }}
										key={index}
										className="image-item"
									>
										<PhotoView src={image["data_url"]}>
											<img
												src={image["data_url"]}
												alt=""
												style={{
													width: "100%",
													height: 250,
													objectFit: "cover",
												}}
											/>
										</PhotoView>
										<div className="image-item__btn-wrapper">
											<Button
												color="error"
												onClick={() => onImageRemove(index)}
											>
												Remove
											</Button>
										</div>
									</div>
								))}
							</div>
						);
					}}
				</ImageUploading>
				<FormControlLabel
					control={
						<Checkbox
							checked={watch("isActive")}
							onChange={(e) => setValue("isActive", e.target.checked)}
						/>
					}
					label="Hiển thị"
				/>
				<ReactQuill
					ref={quillRef}
					theme="snow"
					value={content}
					onChange={(value) => setValue("content", value)}
					bounds={".app"}
					placeholder={"Write something.."}
					modules={modules}
					formats={formats}
				/>

				{error && (
					<Alert
						style={{ marginBottom: "10px", marginTop: "10px" }}
						severity="error"
					>
						{error}
					</Alert>
				)}
				<div className="actions">
					<LoadingButton
						style={{ marginRight: "10px" }}
						variant="contained"
						color="error"
						onClick={handleClose}
					>
						Cancel
					</LoadingButton>
					<LoadingButton
						loading={isPending || isUploading}
						onClick={handleSubmit}
						variant="contained"
						color="success"
					>
						Chỉnh sửa
					</LoadingButton>
				</div>
			</Wrapper>
		</Modal>
	);
};

export const EditModal = memo(EditModalComponent);
