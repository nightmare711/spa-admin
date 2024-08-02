import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";

import { Wrapper } from "./styled";
import { Breadcrumb, Button } from "antd";
import { useRouterState } from "@tanstack/react-router";
import { useDeleteServiceById, useGetServices } from "../../hooks/useServices";
import { withLoading } from "../../components/ui/loading/with-loading";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, TextField } from "@mui/material";
import { PhotoView } from "react-photo-view";
import ImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";
import { useUploadImage } from "../../hooks/useUpload";

const InfoComponent = withLoading(({ turnOffPageLoading }) => {
	const [forceRender, setForceRender] = useState(false);
	const [open, setOpen] = useState(false);
	const { data, isFetched } = useGetServices();
	const root = useRouterState();
	const { mutate: deleteService, isPending } = useDeleteServiceById();
	const path = root.location.href.split("/")?.[1];
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const onClose = () => {
		setSelectedItem(null);
	};

	useEffect(() => {
		if (isFetched) {
			turnOffPageLoading();
		}
	}, [isFetched, turnOffPageLoading]);

	const refetch = () => setForceRender(!forceRender);

	//addmodal-copy
	const [error, setError] = useState("");
	const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
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
		},
	});

	const [images, setImages] = useState<any>([]);
	const [banner, setBanner] = useState<any>([]);
	const maxNumber = 1;
	const quillRef = useRef<any>();

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
			setError("Vui lòng nhập ảnh tiêu đề.");
			return;
		}
		if (banner.length === 0) {
			setError("Vui lòng nhập ảnh banner.");
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
				handlers: {
					image: imageHandler,
				},
			},
			clipboard: {
				matchVisual: false,
			},
		}),
		[imageHandler]
	);

	return (
		<Wrapper>
			<Breadcrumb className="breadcrumb" style={{ margin: "16px 0" }}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>
					<span style={{ textTransform: "capitalize" }}>
						{path?.toLowerCase()}
					</span>
				</Breadcrumb.Item>
			</Breadcrumb>
			<div className="form-container">
				<h1>Chỉnh Sửa Thông Tin Website</h1>

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
				<div className="logo-container">
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
									<span className="label-uploader">Logo 16x16</span>
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
													style={{
														width: 150,
														height: 150,
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
									<span className="label-uploader">Logo 32x32</span>
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
													style={{
														width: 150,
														height: 150,
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
									<span className="label-uploader">Logo Apple</span>
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
													style={{
														width: 150,
														height: 150,
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
									<span className="label-uploader">Logo</span>
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
													style={{
														width: 150,
														height: 150,
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
				</div>
				<div className="contact-container">
					<TextField
						className="title-text"
						fullWidth
						label="Số điện thoại"
						{...register("title", { required: true })}
						size="small"
						error={!!errors.title}
						helperText={errors.title ? "Vui lòng nhập số điện thoại" : ""}
					/>
					<TextField
						className="title-text"
						fullWidth
						label="Link Zalo"
						{...register("title", { required: true })}
						size="small"
						error={!!errors.title}
						helperText={errors.title ? "Vui lòng nhập link zalo" : ""}
					/>

					<TextField
						className="title-text"
						fullWidth
						label="Link Messenger"
						{...register("title", { required: true })}
						size="small"
						error={!!errors.title}
						helperText={errors.title ? "Vui lòng nhập link Messenger" : ""}
					/>
				</div>
				{/* <ReactQuill
					ref={quillRef}
					value={watch("content")}
					onChange={(value) => setValue("content", value)}
					bounds={".app"}
					placeholder={"Write something.."}
					modules={modules}
					formats={formats}
				/> */}
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
						Sửa thông tin Website
					</LoadingButton>
				</div>
			</div>
		</Wrapper>
	);
});

export const Info = memo(withSidebar(InfoComponent));