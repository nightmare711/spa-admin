import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetServices = () => {
	return useQuery({
		queryKey: [useGetServices.name],
		queryFn: async () => (await http.get("/api/v1/products"))?.data,
	});
};

export const useAddService = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddService.name],
		mutationFn: async (newService: any) => {
			console.log(newService);
			return (await http.post("/api/v1/products", newService))?.data;
		},
		onSuccess: () => {
			toast.success("Service added successfully");
			queryClient.invalidateQueries({
				queryKey: [useGetServices.name],
			});
		},
	});
};
export const useUpdateServiceById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateServiceById.name],
		mutationFn: async (updatedService: any) => {
			const data = updatedService;
			return (await http.put(`/api/v1/products/update`, data))?.data;
		},
		onSuccess: () => {
			toast.success("Service updated successfully");
			queryClient.invalidateQueries({
				queryKey: [useGetServices.name],
			});
		},
		onError: (error: any) => {
			toast.error(`Error updating service: ${error.message}`);
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
