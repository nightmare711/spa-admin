import { useMutation } from "@tanstack/react-query";
import http from "../config/axios.config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../store/user";

export const useUpdatePassword = (onSuccess: any) => {
	const dispatch = useDispatch();
	return useMutation({
		mutationKey: [useUpdatePassword.name],
		mutationFn: async (password) => {
			return (
				await http.post("/api/v1/auth/reset/password", { password, userId: 7 })
			)?.data;
		},
		onSuccess: () => {
			toast.success("Mật khẩu đã được cập nhật thành công");
			onSuccess();
			dispatch(deleteAccount());
		},
		onError: (error: any) => {
			toast.error(`Lỗi cập nhật mật khẩu: ${error.message}`);
		},
	});
};
