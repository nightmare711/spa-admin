import { memo, useEffect, useState } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";

import { Wrapper } from "./styled";
import { Breadcrumb, Button } from "antd";
import { useRouterState } from "@tanstack/react-router";
import { withLoading } from "../../components/ui/loading/with-loading";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Paper, TextField } from "@mui/material";
import { PhotoView } from "react-photo-view";
import ImageUploading from "react-images-uploading";
import { useForm } from "react-hook-form";
import { useUploadImage } from "../../hooks/useUpload";
import { useGetMetadata, useUpdateMetadata } from "../../hooks/useMetadata";

const maxNumber = 1;

const InfoComponent = withLoading(({ turnOffPageLoading }) => {
	const { data, isFetched } = useGetMetadata();
	const root = useRouterState();
	const path = root.location.href.split("/")?.[1];

	useEffect(() => {
		if (isFetched) {
			turnOffPageLoading();
		}
	}, [isFetched, turnOffPageLoading]);

	const { mutateAsync: updateMetadata, isPending } = useUpdateMetadata();
	const [error, setError] = useState("");
	const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
	const {
		register,
		setValue,
		trigger,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: data?.title || "",
			description: data?.description || "",
			favicon32: data?.favicon32 || "",
			favicon16: data?.favicon16 || "",
			favicon_apple: data?.favicon_apple || "",
			banner: data?.banner || "",
			logo: data?.logo || "",
			zalo: data?.zalo || "",
			phoneNumber: data?.phoneNumber || "",
			messenger: data?.messenger || "",
		},
	});

	useEffect(() => {
		if (data) {
			setValue("title", data.title || "");
			setValue("description", data.description || "");
			setValue("favicon32", data.favicon32 || "");
			setValue("favicon16", data.favicon16 || "");
			setValue("favicon_apple", data.favicon_apple || "");
			setValue("banner", data.banner || "");
			setValue("logo", data.logo || "");
			setValue("zalo", data.zalo || "");
			setValue("phoneNumber", data.phoneNumber || "");
			setValue("messenger", data.messenger || "");

			// Set images and banner if they exist in the data
			if (data.favicon32) {
				setImages([{ data_url: data.favicon32 }]);
			}
			if (data.banner) {
				setBanner([{ data_url: data.banner }]);
			}
		}
	}, [data, setValue]);

	const [images, setImages] = useState<any>([]);
	const [banner, setBanner] = useState<any>([]);

	const onChange = (imageList: any) => {
		// data for submit
		setImages(imageList);
		setValue("favicon32", imageList?.[0]?.data_url);
		setValue("favicon16", imageList?.[0]?.data_url);
		setValue("favicon_apple", imageList?.[0]?.data_url);
		setValue("logo", imageList?.[0]?.data_url);
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
		if (images.length === 0) {
			setError("Vui lòng nhập ảnh tiêu đề.");
			return;
		}
		if (banner.length === 0) {
			setError("Vui lòng nhập ảnh banner.");
			return;
		}

		const values: any = getValues();

		let currentBanner = getValues("banner");
		if (banner?.[0]?.file) {
			const response = await uploadImage(banner?.[0]?.file);
			currentBanner = response?.data?.url;
		}

		let currentFav = getValues("favicon32");

		if (images?.[0]?.file) {
			const response = await uploadImage(images?.[0]?.file);
			currentFav = response?.data?.url;
		}
		updateMetadata({
			id: data?.id,
			title: values.title,
			description: values.description,
			keywords: values.keywords,
			favicon32: currentFav,
			favicon16: currentFav,
			favicon_apple: currentFav,
			banner: currentBanner,
			logo: currentFav,
			zalo: values.zalo,
			phoneNumber: values.phoneNumber,
			messenger: values.messenger,
		});
	};
	if (!data) {
		return null;
	}

	const values = getValues();
	console.log("values", values);

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
			<Paper>
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
					</div>
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

					<div className="contact-container">
						<TextField
							className="title-text"
							fullWidth
							label="Số điện thoại"
							{...register("phoneNumber", { required: true })}
							size="small"
							error={!!errors.phoneNumber}
							helperText={errors.title ? "Vui lòng nhập số điện thoại" : ""}
						/>
						<TextField
							className="title-text"
							fullWidth
							label="Link Zalo"
							{...register("zalo", { required: true })}
							size="small"
							error={!!errors.zalo}
							helperText={errors.zalo ? "Vui lòng nhập link zalo" : ""}
						/>

						<TextField
							className="title-text"
							fullWidth
							label="Link Messenger"
							{...register("messenger", { required: true })}
							size="small"
							error={!!errors.messenger}
							helperText={
								errors.messenger ? "Vui lòng nhập link Messenger" : ""
							}
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
							loading={isPending || isUploading}
							onClick={handleSubmit}
							variant="contained"
							color="success"
						>
							Sửa thông tin Website
						</LoadingButton>
					</div>
				</div>
			</Paper>
		</Wrapper>
	);
});

export const Info = memo(withSidebar(InfoComponent));
