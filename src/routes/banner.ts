import { createFileRoute } from "@tanstack/react-router";
import { Banner } from "../pages/banner";

export const Route = createFileRoute("/banner")({
	component: Banner,
});
