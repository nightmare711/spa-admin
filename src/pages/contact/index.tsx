import { memo, useEffect } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { Wrapper } from "./styled";
import LoadingButton from "@mui/lab/LoadingButton";
import { Breadcrumb } from "antd";
import { useRouterState } from "@tanstack/react-router";
import { withLoading } from "../../components/ui/loading/with-loading";
import { useGetContact, useMarkAsRead } from "../../hooks/useContact";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ContactComponent = withLoading(({ turnOffPageLoading }) => {
	const { data, isFetched } = useGetContact();
	const { mutate: markAsRead, isPending } = useMarkAsRead();
	const root = useRouterState();
	const path = root.location.href.split("/")?.[1];

	useEffect(() => {
		if (isFetched) {
			turnOffPageLoading();
		}
	}, [isFetched, turnOffPageLoading]);

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
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="center">Tên khách hàng</TableCell>
							<TableCell align="center">Số Điện Thoại</TableCell>
							<TableCell align="center">Dịch vụ cần tư vấn</TableCell>
							<TableCell align="center">Trang thái</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((row: any) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell align="center">{row.name}</TableCell>
								<TableCell align="center">{row.phone}</TableCell>
								<TableCell align="center">{row.service}</TableCell>
								<TableCell align="center">
									<div className="actions">
										{!row.isRead ? (
											<LoadingButton
												loading={isPending}
												onClick={() => markAsRead(row.id)}
												className="LoadingButton"
											>
												Chưa liên hệ khách hàng
											</LoadingButton>
										) : (
											<IconButton>
												<CheckCircleIcon className="mark-icon" />
											</IconButton>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Wrapper>
	);
});

export const Contact = memo(withSidebar(ContactComponent));
