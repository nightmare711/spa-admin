import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";

export const useGetContact = () => {
	return useQuery({
		queryKey: [useGetContact.name],
		queryFn: async () => (await http.get("/api/v1/contacts"))?.data,
	});
};

export const useMarkAsRead = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (contactId: string) => {
			const response = await http.post(`/api/v1/contacts/read/${contactId}`);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [useGetContact.name],
			});
			toast.success("Contact marked as read successfully.");
		},
		onError: (err) => {
			toast.error(err?.message || "Failed to mark contact as read.");
		},
	});
};
