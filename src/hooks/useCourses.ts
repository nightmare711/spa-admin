import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetCourses = () => {
	return useQuery({
		queryKey: [useGetCourses.name],
		queryFn: async () =>
			(await http.get("/api/v1/courses?isActive=true"))?.data,
	});
};

export const useAddCourse = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddCourse.name],
		mutationFn: async (newNews: any) => {
			console.log(newNews);
			return (await http.post("/api/v1/courses", newNews))?.data;
		},
		onSuccess: () => {
			toast.success("Thêm khóa học thành công");
			queryClient.invalidateQueries({
				queryKey: [useGetCourses.name],
			});
		},
	});
};
export const useUpdateCourseById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateCourseById.name],
		mutationFn: async (updatedNews: any) => {
			const data = updatedNews;
			return (await http.put(`/api/v1/courses/update`, data))?.data;
		},
		onSuccess: () => {
			toast.success("Chỉnh sửa thành công.");
			queryClient.invalidateQueries({
				queryKey: [useGetCourses.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Lỗi xóa khóa học: ${error.message}`);
		},
	});
};

export const useDeleteCourseById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteCourseById.name],
		mutationFn: async (courseID: string) => {
			return (await http.delete(`/api/v1/courses/${courseID}`))?.data;
		},
		onSuccess: () => {
			toast.success("Xóa thành công.");
			queryClient.invalidateQueries({
				queryKey: [useGetCourses.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Lỗi xóa khóa học: ${error.message}`);
		},
	});
};
