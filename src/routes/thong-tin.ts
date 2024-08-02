import { createFileRoute } from "@tanstack/react-router";
import { Info } from "../pages/info";

export const Route = createFileRoute("/thong-tin")({
	component: Info,
});
