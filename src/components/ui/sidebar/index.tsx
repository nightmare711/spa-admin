import React, { memo, useState } from "react";
import {
	LogoutOutlined,
	SnippetsOutlined,
	ProductOutlined,
	DatabaseOutlined,
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
		getItem("Services", "2", <ProductOutlined />, undefined, () => {
			navigate({ to: "/services" });
		}),
		getItem("News", "3", <SnippetsOutlined />, undefined, () => {
			navigate({ to: "/news" });
		}),

		{
			key: 9,
			icon: <LogoutOutlined />,
			label: "Logout",
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
