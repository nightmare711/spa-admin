import { memo, useEffect, useState } from "react";
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
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumb, Button, Typography } from "antd";
import { useRouterState } from "@tanstack/react-router";
import { useDeleteServiceById, useGetServices } from "../../hooks/useServices";
import { AddModal } from "./components/add-modal";
import { EditModal } from "./components/edit-modal";
import { withLoading } from "../../components/ui/loading/with-loading";

const ServicesComponent = withLoading(({ turnOffPageLoading }) => {
	const [open, setOpen] = useState(false);
	const { data, isFetched } = useGetServices();
	const root = useRouterState();
	const { mutate: deleteService, isPending } = useDeleteServiceById();
	const path = root.location.href.split("/")?.[1];
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const onClose = () => {
		setSelectedItem(null);
	};

	useEffect(() => {
		if (isFetched) {
			turnOffPageLoading();
		}
	}, [isFetched, turnOffPageLoading]);

	return (
		<Wrapper>
			<AddModal open={open} onClose={() => setOpen(false)} />
			{selectedItem ? (
				<EditModal
					open={!!selectedItem}
					onClose={onClose}
					item={selectedItem}
				/>
			) : null}
			<Breadcrumb style={{ margin: "16px 0" }}>
				<Breadcrumb.Item>Dasboard</Breadcrumb.Item>
				<Breadcrumb.Item>
					<span style={{ textTransform: "capitalize" }}>
						{path?.toLowerCase()}
					</span>
				</Breadcrumb.Item>
			</Breadcrumb>
			<div className="actions-button">
				<Button
					onClick={() => setOpen(true)}
					color="primary"
					icon={<AddIcon />}
					className="action"
				>
					Add New Service
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="center">Title</TableCell>
							<TableCell align="center">Description</TableCell>
							<TableCell align="center">Slug</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((row: any) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									<Typography.Paragraph>{row.id}</Typography.Paragraph>
								</TableCell>
								<TableCell align="center">{row.title}</TableCell>
								<TableCell align="center">{row.description}</TableCell>
								<TableCell align="center">{row.slug}</TableCell>
								<TableCell align="center">
									<div className="actions">
										<LoadingButton onClick={() => setSelectedItem(row)}>
											<IconButton>
												<EditNoteIcon color="primary" />
											</IconButton>
										</LoadingButton>
										<LoadingButton
											loading={isPending}
											onClick={() => deleteService(row.id)}
										>
											<IconButton>
												<DeleteForeverIcon color="error" />
											</IconButton>
										</LoadingButton>
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

export const Services = memo(withSidebar(ServicesComponent));
