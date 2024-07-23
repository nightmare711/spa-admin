import React from "react";
import { useState } from "react";
import { Loading } from ".";

export function withLoading<P extends object>(
	WrappedComponent: React.ComponentType<
		P & { turnOffPageLoading: () => void; turnOnPageLoading: () => void }
	>
): React.FC<P> {
	const WithLoading: React.FC<P> = ({ ...props }: P) => {
		const [isLoading, setIsLoading] = useState(true);
		const turnOffPageLoading = () => {
			setIsLoading(false);
		};

		const turnOnPageLoading = () => {
			setIsLoading(true);
		};

		return (
			<>
				<Loading loading={isLoading} />
				<WrappedComponent
					{...(props as P)}
					turnOffPageLoading={turnOffPageLoading}
					turnOnPageLoading={turnOnPageLoading}
				/>
			</>
		);
	};

	return WithLoading;
}
