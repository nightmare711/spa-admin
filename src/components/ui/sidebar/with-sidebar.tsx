import React from "react";
import { Sidebar } from ".";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
export function withSidebar<P extends object>(
	WrappedComponent: React.ComponentType<P>
): React.FC<P> {
	const WithSidebar: React.FC<P> = ({ ...props }: P) => {
		return (
			<Layout style={{ minHeight: "100vh" }}>
				<Sidebar />
				<Layout>
					<Content style={{ margin: "0 16px" }}>
						<WrappedComponent {...(props as P)} />
					</Content>
					<Footer style={{ textAlign: "center" }}>
						Thẩm mỹ viện Hoài An ©{new Date().getFullYear()}
					</Footer>
				</Layout>
			</Layout>
		);
	};

	return WithSidebar;
}
