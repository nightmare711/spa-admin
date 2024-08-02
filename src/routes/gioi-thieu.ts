import { createFileRoute } from "@tanstack/react-router";
import { Intro } from "../pages/intro";

export const Route = createFileRoute("/gioi-thieu")({
	component: Intro,
});
