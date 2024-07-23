import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetBanner = () => {
	return useQuery({
		queryKey: [useGetBanner.name],
		queryFn: async () => (await http.get("/api/banners"))?.data,
	});
};

export const useDeleteBanner = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteBanner.name],
		mutationFn: async (id: number) =>
			(await http.delete(`/api/banners/delete/${id}`))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetBanner.name] });
		},
	});
};

export const useUpdateBanner = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateBanner.name],
		mutationFn: async (banner: {
			id: number;
			title: string;
			description: string;
			url: string;
		}) => (await http.post(`/api/banners/update`, banner))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetBanner.name] });
			toast.success("Banner updated successfully");
		},
		onError: (err: any) => {
			toast.error(err?.data?.message || "Something were wrong");
		},
	});
};

export const useAddNewBanner = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddNewBanner.name],
		mutationFn: async (banner: {
			title: string;
			description: string;
			url: string;
		}) => (await http.post(`/api/banners`, banner))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetBanner.name] });
			toast.success("Banner added successfully");
		},
		onError: (err: any) => {
			toast.error(err?.data?.message || "Something were wrong");
		},
	});
};
