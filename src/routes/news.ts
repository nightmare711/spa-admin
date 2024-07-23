import { createFileRoute } from "@tanstack/react-router";
import { News } from "../pages/news";

export const Route = createFileRoute("/news")({
	component: News,
});
