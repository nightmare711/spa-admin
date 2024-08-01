import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetBanner = () => {
	return useQuery({
		queryKey: [useGetBanner.name],
		queryFn: async () => (await http.get("/api/v1/library"))?.data,
	});
};

export const useDeleteBanner = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteBanner.name],
		mutationFn: async (id: number) =>
			(await http.delete(`/api/v1/library/delete/${id}`))?.data,
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
		}) => (await http.post(`/api/v1/library/update`, banner))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetBanner.name] });
			toast.success("Update thành công.");
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
		}) => (await http.post(`/api/v1/library`, banner))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetBanner.name] });
			toast.success("Thêm thành công.");
		},
		onError: (err: any) => {
			toast.error(err?.data?.message || "Something were wrong");
		},
	});
};
