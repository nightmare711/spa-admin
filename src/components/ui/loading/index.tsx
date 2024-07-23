import { memo, useEffect } from "react";
import { Wrapper } from "./styled";
import AnimationData from "../../../assets/animation/spin.json";
import Lottie from "react-lottie";

interface ILoadingProps {
	loading: boolean;
}

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: AnimationData,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const LoadingComponent = ({ loading }: ILoadingProps) => {
	const handleShowLoading = () => {
		(document.getElementById("loading") as any).style.visibility = "visible";
		(document.getElementById("loading") as any).style.opacity = "1";
	};

	const handleDisableLoading = () => {
		(document.getElementById("loading") as any).style.visibility = "hidden";
		(document.getElementById("loading") as any).style.opacity = "0";
	};

	useEffect(() => {
		if (loading) {
			handleShowLoading();
		} else {
			handleDisableLoading();
		}
	}, [loading]);

	return (
		<Wrapper id="loading">
			<Lottie options={defaultOptions} height={200} width={200} />
		</Wrapper>
	);
};

export const Loading = memo(LoadingComponent);
