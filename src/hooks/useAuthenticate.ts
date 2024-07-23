import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import http from "../config/axios.config";
import { updateAccount } from "../store/user";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

export const useLoginByEmail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async (data: any) => {
			const response = await http.post("/api/v1/auth/email/login", data);
			dispatch(
				updateAccount({
					token: response.data.token,
					expiresIn: response.data.tokenExpires,
					user: response.data.user,
				})
			);

			return response;
		},
		onSuccess: () => {
			toast.success("Welcome back! You have successfully logged in.");
			navigate({ to: "/banner" });
		},
		onError: (err) => {
			toast.error(err?.message || "Something went wrong");
		},
	});
};
