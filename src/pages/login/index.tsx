import { memo } from "react";
import { useForm, Controller } from "react-hook-form";
import { Wrapper } from "./styled";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLoginByEmail } from "../../hooks/useAuthenticate";

const LoginComponent = () => {
	const { control, handleSubmit, trigger } = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { mutate: login, isPending: loading } = useLoginByEmail();

	const onSubmit = async (data: any) => {
		const isValid = await trigger();
		if (!isValid) return;
		await login(data);
	};

	return (
		<Wrapper>
			<div className="background">
				<div className="shape"></div>
			</div>
			<form
				className="w-full max-w-sm border shadow-lg p-6 rounded-lg form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-2xl font-bold mb-4 text-center">Welcome Back !</h2>
				<p className="mb-6 text-center">
					Sign in to continue to Thẩm Mỹ Hoài An
				</p>
				<div className="mb-4">
					<Controller
						name="email"
						control={control}
						defaultValue=""
						rules={{ required: "Email is required" }}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								fullWidth
								label="Email"
								variant="outlined"
								id="username"
								placeholder="Enter email"
								margin="normal"
								error={!!error}
								helperText={error ? error.message : null}
								InputProps={{
									style: {
										backgroundColor: "#f0f0f0",
										borderRadius: "8px",
									},
								}}
								InputLabelProps={{
									style: {
										color: "#364574",
									},
								}}
							/>
						)}
					/>
				</div>
				<div className="mb-4">
					<Controller
						name="password"
						control={control}
						defaultValue=""
						rules={{ required: "Password is required" }}
						render={({ field, fieldState: { error } }) => (
							<TextField
								{...field}
								fullWidth
								label="Password"
								variant="outlined"
								type="password"
								id="password"
								placeholder="Enter password"
								margin="normal"
								error={!!error}
								helperText={error ? error.message : null}
								InputProps={{
									style: {
										backgroundColor: "#f0f0f0",
										borderRadius: "8px",
									},
								}}
								InputLabelProps={{
									style: {
										color: "#364574",
									},
								}}
							/>
						)}
					/>
					<a
						className="text-sm text-blue-500 float-right mb-2 hover:underline"
						href="#"
					>
						Forgot password?
					</a>
				</div>

				<LoadingButton
					loading={loading}
					fullWidth
					variant="contained"
					color="primary"
					type="submit"
					style={{
						backgroundColor: "#405189",
						borderRadius: "8px",
						padding: "10px 0",
						fontSize: "16px",
					}}
				>
					Sign In
				</LoadingButton>
			</form>
		</Wrapper>
	);
};

export const Login = memo(LoginComponent);
