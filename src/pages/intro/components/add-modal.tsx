import { Modal } from "antd";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Wrapper } from "./add-modal.styled";
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
import { useAddIntroduction } from "../../../hooks/useIntro";
import { useUploadImage } from "../../../hooks/useUpload";

interface IAddModalProps {
	open: boolean;
	onClose: () => void;
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

const AddModalComponent = ({ open, onClose }: IAddModalProps) => {
	const quillRef = useRef<any>();
	const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
	const [error, setError] = useState("");
	const { mutateAsync: addIntroduction, isPending } = useAddIntroduction();
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
			title: "",
			description: "",
			image: "",
			banner: "",
			content: "",
			isActive: true,
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

	const handleSubmit = async () => {
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		const image = getValues("image");
		const content = getValues("content");
		if (!image) {
			setError("Vui lòng ảnh tiêu đề.");
			return;
		}
		if (banner.length === 0) {
			setError("Vui lòng ảnh banner.");
			return;
		}
		if (!content) {
			setError("Please write content to proceed.");
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

			await addIntroduction({
				title: values.title,
				description: values.description,
				slug,
				image: res?.data?.url,
				banner: resBanner?.data?.url,
				content,
				isActive: values.isActive,
			} as any);
		} else {
			await addIntroduction({
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

	return (
		<Modal
			destroyOnClose
			title={`Thêm giới thiệu`}
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
										Click hoặc thả hình vào đây
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
												Xóa hình ảnh
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
										Click hoặc thả hình vào đây
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
					ref={(element) => {
						if (element != null) {
							quillRef.current = element;
						}
					}}
					value={watch("content")}
					onChange={(content, delta, source, editor) => {
						console.log("##11", content, delta, source);
						setValue("content", editor.getHTML());
					}}
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
						Thêm Giới Thiệu
					</LoadingButton>
				</div>
			</Wrapper>
		</Modal>
	);
};

export const AddModal = memo(AddModalComponent);
