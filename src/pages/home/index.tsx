import { memo, useEffect } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";
import { Wrapper } from "./styled";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selector";

const HomeComponent = () => {
	const token = useSelector(selectToken);
	const navigator = useNavigate();
	useEffect(() => {
		if (token) {
			navigator({
				to: "/banner",
			});
		}
	}, [navigator, token]);
	return (
		<Wrapper>
			<h1>Home</h1>
		</Wrapper>
	);
};

export const Home = memo(withSidebar(HomeComponent));
