import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { selectToken } from "./store/user/selector";
import { setAccessToken } from "./config/axios.config";
import { PhotoProvider } from "react-photo-view";
import "react-quill/dist/quill.snow.css";
import "react-photo-view/dist/react-photo-view.css";

const queryClient = new QueryClient();

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps): FunctionComponent => {
	const token = useSelector(selectToken);
	useEffect(() => {
		if (!token) {
			router.navigate({ to: "/login" });
		} else {
			setAccessToken(token);
		}
	}, [router, token]);
	return (
		<PhotoProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					pauseOnFocusLoss
					pauseOnHover
				/>
			</QueryClientProvider>
		</PhotoProvider>
	);
};

export default App;
