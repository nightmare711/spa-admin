import { PropsWithChildren } from "react";
import { Wrapper } from "./styled";

export const ContainerComponent = ({ children }: PropsWithChildren) => {
	return <Wrapper>{children}</Wrapper>;
};
