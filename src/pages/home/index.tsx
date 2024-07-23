import { memo } from "react";
import { withSidebar } from "../../components/ui/sidebar/with-sidebar";
import { Wrapper } from "./styled";

const HomeComponent = () => {
	return (
		<Wrapper>
			<h1>Home</h1>
		</Wrapper>
	);
};

export const Home = memo(withSidebar(HomeComponent));
