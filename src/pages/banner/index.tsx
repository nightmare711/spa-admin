import { memo, useEffect, useState } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";
import { useDeleteBanner, useGetBanner } from "../../hooks/useBanner";
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
import { EditModal } from "./components/edit-modal";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumb, Button } from "antd";
import { AddModal } from "./components/add-modal";
import { useRouterState } from "@tanstack/react-router";
import { withLoading } from "../../components/ui/loading/with-loading";
import { PhotoView } from "react-photo-view";

const BannerComponent = withLoading(({ turnOffPageLoading }) => {
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [open, setOpen] = useState(false);
	const { data, isFetched } = useGetBanner();
	const root = useRouterState();
	const path = root.location.href.split("/")?.[1];

	const { mutate: deleteBanner, isPending } = useDeleteBanner();
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
					Add New Banner
				</Button>
			</div>
			<AddModal open={open} onClose={() => setOpen(false)} />
			<EditModal open={!!selectedItem} onClose={onClose} item={selectedItem} />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="center">Title</TableCell>
							<TableCell align="center">Description</TableCell>
							<TableCell align="center">Image</TableCell>
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
									{row.id}
								</TableCell>
								<TableCell align="center">{row.title}</TableCell>
								<TableCell align="center">{row.description}</TableCell>
								<TableCell align="center">
									<PhotoView src={row.url}>
										<img className="banner-image" src={row.url} />
									</PhotoView>
								</TableCell>
								<TableCell align="center">
									<div className="actions">
										<LoadingButton
											loading={isPending}
											onClick={() => setSelectedItem(row)}
										>
											<IconButton>
												<EditNoteIcon color="primary" />
											</IconButton>
										</LoadingButton>
										<LoadingButton
											loading={isPending}
											onClick={() => deleteBanner(row.id)}
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

export const Banner = memo(withSidebar(BannerComponent));
