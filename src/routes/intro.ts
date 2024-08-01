import { createFileRoute } from "@tanstack/react-router";
import { Intro } from "../pages/intro";

export const Route = createFileRoute("/intro")({
	component: Intro,
});
