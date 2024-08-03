import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";

export const useGetMetadata = () => {
	return useQuery({
		queryKey: [useGetMetadata.name],
		queryFn: async () => (await http.get("/api/v1/metadata"))?.data?.[0],
	});
};

export const useUpdateMetadata = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [useUpdateMetadata.name],
		mutationFn: async (metadata: any) =>
			(await http.put(`/api/v1/metadata/update`, metadata))?.data,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [useGetMetadata.name] });
			toast.success("Cập nhật Thông tin thành công.");
		},
		onError: () => {
			toast.error("Đã xảy ra lỗi khi cập nhật metadata");
		},
	});
};
