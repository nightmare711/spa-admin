import { createFileRoute } from "@tanstack/react-router";
import { Services } from "../pages/services";

export const Route = createFileRoute("/dich-vu")({
	component: Services,
});
