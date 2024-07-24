import { useMutation } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";

export const useUploadImage = () => {
	return useMutation({
		mutationKey: [useUploadImage.name],
		mutationFn: async (imageData: any) => {
			const formData = new FormData();
			formData.append("file", imageData);
			return (
				await http.post("/api/cloudinary/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
			)?.data;
		},

		onError: (error: any) => {
			toast.error(`Error uploading image: ${error.message}`);
		},
	});
};
