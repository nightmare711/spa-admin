import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider as ProviderRedux } from "react-redux";
import "./styles/tailwind.css";
import { store } from "./store";

const router = createRouter({ routeTree });
let persistor = persistStore(store);

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<ProviderRedux store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App router={router} />
				</PersistGate>
			</ProviderRedux>
		</React.StrictMode>
	);
}
