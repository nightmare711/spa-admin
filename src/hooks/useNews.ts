import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetNews = () => {
	return useQuery({
		queryKey: [useGetNews.name],
		queryFn: async () => (await http.get("/api/v1/news"))?.data,
	});
};

export const useAddNews = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddNews.name],
		mutationFn: async (newNews: any) => {
			console.log(newNews);
			return (await http.post("/api/v1/news", newNews))?.data;
		},
		onSuccess: () => {
			toast.success("Thêm tin tức thành công");
			queryClient.invalidateQueries({
				queryKey: [useGetNews.name],
			});
		},
	});
};
export const useUpdateNewsById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateNewsById.name],
		mutationFn: async (updatedNews: any) => {
			const data = updatedNews;
			return (await http.put(`/api/v1/news/update`, data))?.data;
		},
		onSuccess: () => {
			toast.success("Chỉnh sửa thành công.");
			queryClient.invalidateQueries({
				queryKey: [useGetNews.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Lỗi xóa tin tức: ${error.message}`);
		},
	});
};

export const useDeleteNewsById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteNewsById.name],
		mutationFn: async (newsId: string) => {
			return (await http.delete(`/api/v1/news/${newsId}`))?.data;
		},
		onSuccess: () => {
			toast.success("Xóa thành công.");
			queryClient.invalidateQueries({
				queryKey: [useGetNews.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Lỗi xóa tin tức: ${error.message}`);
		},
	});
};
