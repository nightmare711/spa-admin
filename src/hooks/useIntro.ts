import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import http from "../config/axios.config";
import { toast } from "react-toastify";

export const useGetIntroductions = () => {
	return useQuery({
		queryKey: [useGetIntroductions.name],
		queryFn: async () => (await http.get("/api/v1/introductions"))?.data,
	});
};

export const useAddIntroduction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddIntroduction.name],
		mutationFn: async (newIntroduction: any) => {
			console.log(newIntroduction);
			return (await http.post("/api/v1/introductions", newIntroduction))?.data;
		},
		onSuccess: () => {
			toast.success("Thêm giới thiệu thành công");
			queryClient.invalidateQueries({
				queryKey: [useGetIntroductions.name],
			});
		},
	});
};

export const useUpdateIntroductionById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateIntroductionById.name],
		mutationFn: async (updatedIntroduction: any) => {
			const data = updatedIntroduction;
			return (await http.put(`/api/v1/introductions/update`, data))?.data;
		},
		onSuccess: () => {
			toast.success("Chỉnh sửa thành công.");
			queryClient.invalidateQueries({
				queryKey: [useGetIntroductions.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Lỗi chỉnh sửa giới thiệu: ${error.message}`);
		},
	});
};

export const useDeleteIntroductionById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteIntroductionById.name],
		mutationFn: async (introductionId: string) => {
			return (await http.delete(`/api/v1/introductions/${introductionId}`))
				?.data;
		},
		onSuccess: () => {
			toast.success("Xóa thành công.");
			queryClient.invalidateQueries({
				queryKey: [useGetIntroductions.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Lỗi xóa giới thiệu: ${error.message}`);
		},
	});
};
