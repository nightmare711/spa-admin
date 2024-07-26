import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetServices = () => {
	return useQuery({
		queryKey: [useGetServices.name],
		queryFn: async () => {
			const response = (await http.get("/api/v1/products"))?.data;
			console.log("response", response);
			return response;
		},
	});
};

export const useAddService = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddService.name],
		mutationFn: async (newService: any) => {
			return (await http.post("/api/v1/products", newService))?.data;
		},
		onSuccess: async () => {
			toast.success("Thêm dịch vụ thành công.");
			await queryClient.invalidateQueries({
				queryKey: [useGetServices.name],
			});
			onSuccess && onSuccess();
		},
	});
};
export const useUpdateServiceById = (onSuccess?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateServiceById.name],
		mutationFn: async (updatedService: any) => {
			return (await http.put(`/api/v1/products/update`, updatedService))?.data;
		},
		onSuccess: async () => {
			toast.success("Chỉnh sửa thành công.");
			await queryClient.invalidateQueries({
				queryKey: [useGetServices.name],
			});
			onSuccess && onSuccess();
		},
		onError: (error: any) => {
			toast.error(`Lỗi chỉnh sửa dịch vụ: ${error.message}`);
		},
	});
};

export const useDeleteServiceById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteServiceById.name],
		mutationFn: async (serviceId: string) => {
			return (await http.delete(`/api/v1/products/${serviceId}`))?.data;
		},
		onSuccess: () => {
			toast.success("Service deleted successfully");
			queryClient.invalidateQueries({
				queryKey: [useGetServices.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Error deleting service: ${error.message}`);
		},
	});
};
