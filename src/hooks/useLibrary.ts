import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";
export const useGetLibraries = () => {
	return useQuery({
		queryKey: [useGetLibraries.name],
		queryFn: async () => (await http.get("/api/v1/libraries"))?.data,
	});
};

export const useDeleteLibrary = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useDeleteLibrary.name],
		mutationFn: async (id: number) =>
			(await http.delete(`/api/v1/libraries/${id}`))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetLibraries.name] });
		},
	});
};

export const useUpdateLibrary = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateLibrary.name],
		mutationFn: async (banner: {
			id: number;
			title: string;
			description: string;
			url: string;
		}) => (await http.put(`/api/v1/libraries/update`, banner))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetLibraries.name] });
			toast.success("Update thành công.");
		},
		onError: (err: any) => {
			toast.error(err?.data?.message || "Something were wrong");
		},
	});
};

export const useAddNewLibrary = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useAddNewLibrary.name],
		mutationFn: async (banner: {
			title: string;
			description: string;
			url: string;
		}) => (await http.post(`/api/v1/libraries`, banner))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetLibraries.name] });
			toast.success("Thêm thành công.");
		},
		onError: (err: any) => {
			toast.error(err?.data?.message || "Something were wrong");
		},
	});
};
