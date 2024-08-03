import { memo } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";
import * as React from "react";

import { Wrapper } from "./styled";
import { Breadcrumb } from "antd";
import { useRouterState } from "@tanstack/react-router";
import { withLoading } from "../../components/ui/loading/with-loading";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useUpdatePassword } from "../../hooks/useUser";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

const PasswordComponent = withLoading(({ turnOffPageLoading }) => {
	const {
		control,
		trigger,
		formState: { errors },
		reset,
		getValues,
	} = useForm({
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
	});
	const root = useRouterState();
	const path = root.location.href.split("/")?.[1];

	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	React.useEffect(() => {
		turnOffPageLoading();
	}, []);

	const { mutate: updatePassword, isPending } = useUpdatePassword(() => {
		reset();
	});

	const onSubmit = async () => {
		const isValid = await trigger();
		const values = getValues();
		if (isValid) {
			await updatePassword(values.newPassword as any);
		} else {
			toast.error("Vui lòng nhập đầy đủ thông tin");
		}
	};

	return (
		<Wrapper>
			<Breadcrumb style={{ margin: "16px 0" }}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>
					<span style={{ textTransform: "capitalize" }}>
						{path?.toLowerCase()}
					</span>
				</Breadcrumb.Item>
			</Breadcrumb>
			<div className="container">
				<h1>Đổi mật khẩu ADMIN</h1>
				<Box
					component="form"
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						margin: "0 auto",
					}}
				>
					<Controller
						name="newPassword"
						control={control}
						rules={{ required: "Mật khẩu mới là bắt buộc" }}
						render={({ field }) => (
							<FormControl sx={{ m: 1 }} variant="outlined">
								<InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
								<OutlinedInput
									{...field}
									error={!!errors.newPassword}
									id="new-password"
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label="Mật khẩu mới"
								/>
							</FormControl>
						)}
					/>
					<Controller
						name="confirmPassword"
						control={control}
						rules={{
							required: "Xác nhận mật khẩu là bắt buộc",
							validate: (value, formValues) =>
								value === formValues.newPassword || "Mật khẩu không khớp",
						}}
						render={({ field }) => (
							<FormControl sx={{ m: 1 }} variant="outlined">
								<InputLabel htmlFor="confirm-password">
									Xác nhận mật khẩu mới
								</InputLabel>
								<OutlinedInput
									{...field}
									id="confirm-password"
									error={!!errors.confirmPassword}
									type={showPassword ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									}
									label="Xác nhận mật khẩu mới"
								/>
							</FormControl>
						)}
					/>
					<div className="actions-button">
						<LoadingButton
							className="action"
							loading={isPending}
							onClick={onSubmit}
							color="primary"
							variant="contained"
						>
							Đổi mật khẩu
						</LoadingButton>
					</div>
				</Box>
			</div>
		</Wrapper>
	);
});

export const Password = memo(withSidebar(PasswordComponent));
