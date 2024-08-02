import React, { memo, useState } from "react";
import {
	LogoutOutlined,
	SnippetsOutlined,
	ProductOutlined,
	DatabaseOutlined,
	PhoneOutlined,
	SignatureOutlined,
	ContactsOutlined,
	FileSearchOutlined,
	FileImageOutlined,
	DesktopOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../../store/user";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	onClick?: () => void
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		onClick,
	} as MenuItem;
}

const SidebarComponent: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const root = useRouterState();
	const [collapsed, setCollapsed] = useState(false);
	const items: MenuItem[] = [
		getItem("Banner", "1", <DatabaseOutlined />, undefined, () => {
			navigate({ to: "/banner" });
		}),
		getItem("Giới thiệu", "2", <ContactsOutlined />, undefined, () => {
			navigate({ to: "/gioi-thieu" });
		}),
		getItem("Dịch vụ", "3", <ProductOutlined />, undefined, () => {
			navigate({ to: "/dich-vu" });
		}),
		getItem("Tin tức", "4", <SnippetsOutlined />, undefined, () => {
			navigate({ to: "/tin-tuc" });
		}),

		getItem("Khóa học", "5", <FileSearchOutlined />, undefined, () => {
			navigate({ to: "/khoa-hoc" });
		}),

		getItem("Thư viện hình ảnh", "6", <FileImageOutlined />, undefined, () => {
			navigate({ to: "/thu-vien" });
		}),

		getItem("Liên hệ khách hàng", "7", <PhoneOutlined />, undefined, () => {
			navigate({ to: "/lien-he" });
		}),

		getItem("Thông tin website", "8", <DesktopOutlined />, undefined, () => {
			navigate({ to: "/thong-tin" });
		}),

		getItem("Đổi mật khẩu", "9", <SignatureOutlined />, undefined, () => {
			navigate({ to: "/password" });
		}),

		{
			key: 9,
			icon: <LogoutOutlined />,
			label: "Đăng xuất",
			onClick: () => dispatch(deleteAccount()),
		},
	];

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
		>
			<div className="demo-logo-vertical" />
			<Menu
				theme="dark"
				defaultSelectedKeys={["2"]}
				selectedKeys={
					[
						items.find((item: any) => {
							console.log(
								item.label.toLowerCase(),
								root.location.href.split("/")?.[1]
							);
							return item.label
								.toLowerCase()
								.includes(root.location.href.split("/")?.[1]);
						})?.key || "Banner",
					] as any
				}
				mode="inline"
				items={items}
			/>
		</Sider>
	);
};

export const Sidebar = memo(SidebarComponent);
