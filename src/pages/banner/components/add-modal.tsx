import { Modal } from "antd";
import { memo, useState } from "react";
import { Wrapper } from "./edit-modal.styled";
import { Alert, Button, TextField } from "@mui/material";
import ImageUploading from "react-images-uploading";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useAddNewBanner } from "../../../hooks/useBanner";
import { useUploadImage } from "../../../hooks/useUpload";

interface IEditModalProps {
	open: boolean;
	onClose: () => void;
}
const AddModalComponent = ({ open, onClose }: IEditModalProps) => {
	const [error, setError] = useState("");
	const { mutateAsync: addBanner, isPending } = useAddNewBanner();
	const { register, setValue, trigger, getValues, reset } = useForm({
		defaultValues: {
			title: "",
			description: "",
			url: "",
		},
	});

	const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

	const [images, setImages] = useState<any>([]);
	const maxNumber = 1;

	const handleClose = () => {
		reset();
		setImages([]);
		onClose();
	};

	const onChange = (imageList: any) => {
		// data for submit
		setImages(imageList);
		setValue("url", imageList?.[0]?.data_url);
	};

	const handleSubmit = async () => {
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		const url = getValues("url");
		if (!url) {
			setError("Vui lòng thêm hình ảnh.");
		}

		if (images?.[0]?.file) {
			const res = await uploadImage(images?.[0]?.file);

			await addBanner({
				title: getValues("title"),
				description: getValues("description"),
				url: res?.data?.url,
			});
		} else {
			await addBanner({
				title: getValues("title"),
				description: getValues("description"),
				url: url,
			});
		}

		handleClose();
	};

	return (
		<Modal
			destroyOnClose
			title={`Thêm Banner`}
			open={open}
			onCancel={onClose}
			footer={null}
		>
			<Wrapper>
				<TextField
					className="title-text"
					fullWidth
					label="Tiêu đề"
					{...register("title")}
				/>
				<TextField
					fullWidth
					style={{ marginTop: "10px" }}
					label="Mô tả"
					{...register("description")}
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
								<button
									className="update"
									style={isDragging ? { color: "red" } : undefined}
									onClick={onImageUpload}
									{...dragProps}
								>
									Click hoặc Thả ảnh vào đây
								</button>
								&nbsp;
								{imageList.map((image, index) => (
									<div key={index} className="image-item">
										<img src={image["data_url"]} alt="" width="100" />
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
				{error && (
					<Alert style={{ marginBottom: "10px" }} severity="error">
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
						Thêm Banner
					</LoadingButton>
				</div>
			</Wrapper>
		</Modal>
	);
};

export const AddModal = memo(AddModalComponent);
