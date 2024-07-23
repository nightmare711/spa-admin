import { Modal } from "antd";
import { memo, useEffect, useState } from "react";
import { Wrapper } from "./edit-modal.styled";
import { Alert, Button, TextField } from "@mui/material";
import ImageUploading from "react-images-uploading";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { useUpdateBanner } from "../../../hooks/useBanner";

interface IEditModalProps {
	open: boolean;
	onClose: () => void;
	item: any;
}
const EditModalComponent = ({ open, onClose, item }: IEditModalProps) => {
	const [error, setError] = useState("");
	const { mutateAsync: updateBanner, isPending } = useUpdateBanner();
	const { register, setValue, trigger, getValues, reset } = useForm({
		defaultValues: {
			title: "",
			description: "",
			url: "",
		},
	});
	const [images, setImages] = useState([]);
	const maxNumber = 1;

	const onChange = (imageList: any, addUpdateIndex: any) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
		setValue("url", imageList?.[0]?.data_url);
	};

	const handleClose = () => {
		reset();
		setImages([]);
		onClose();
	};

	const handleSubmit = async () => {
		const isValid = await trigger();
		if (!isValid) {
			return;
		}
		const url = getValues("url");
		if (!url) {
			setError("Please upload an image to proceed.");
		}
		await updateBanner({
			id: item.id,
			title: getValues("title"),
			description: getValues("description"),
			url,
		});
		handleClose();
	};

	useEffect(() => {
		setValue("title", item?.title);
		setValue("description", item?.description);
		setValue("url", item?.url);
		setImages([{ data_url: item?.url }] as any);
	}, [item, setValue]);

	return (
		<Modal
			destroyOnClose
			title={`Edit Banner #${item?.id}`}
			open={open}
			onCancel={onClose}
			footer={null}
		>
			<Wrapper>
				<TextField
					className="title-text"
					fullWidth
					label="Title"
					defaultValue={item?.title}
					{...register("title")}
				/>
				<TextField
					fullWidth
					style={{ marginTop: "10px" }}
					label="Description"
					defaultValue={item?.description}
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
					}) => (
						// write your building UI
						<div className="upload__image-wrapper">
							<button
								className="update"
								style={isDragging ? { color: "red" } : undefined}
								onClick={onImageUpload}
								{...dragProps}
							>
								Click or Drop here
							</button>
							&nbsp;
							{imageList.map((image, index) => (
								<div key={index} className="image-item">
									<img src={image["data_url"]} alt="" width="100" />
									<div className="image-item__btn-wrapper">
										<Button color="error" onClick={() => onImageRemove(index)}>
											Remove
										</Button>
									</div>
								</div>
							))}
						</div>
					)}
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
						loading={isPending}
						onClick={handleSubmit}
						variant="contained"
						color="success"
					>
						Update
					</LoadingButton>
				</div>
			</Wrapper>
		</Modal>
	);
};

export const EditModal = memo(EditModalComponent);
