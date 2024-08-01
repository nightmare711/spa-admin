import { memo } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";
import * as React from "react";

import { Wrapper } from "./styled";
import { Breadcrumb, Button } from "antd";
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

const PasswordComponent = withLoading(({ turnOffPageLoading }) => {
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
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						margin: "0 auto",
					}}
				>
					<FormControl sx={{ m: 1 }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Mật khảu cũ
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
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
							label="Password"
						/>
					</FormControl>
					<FormControl sx={{ m: 1 }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Mật Khẩu mới
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
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
							label="Password"
						/>
					</FormControl>
					<FormControl sx={{ m: 1 }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">
							Xác nhận mật khẩu mới
						</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
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
							label="Password"
						/>
					</FormControl>
				</Box>
				<div className="actions-button">
					<Button color="primary" className="action">
						Đổi mật khẩu
					</Button>
				</div>
			</div>
		</Wrapper>
	);
});

export const Password = memo(withSidebar(PasswordComponent));
