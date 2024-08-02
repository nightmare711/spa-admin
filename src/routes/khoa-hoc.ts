import { Courses } from "../pages/courses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/khoa-hoc")({
	component: Courses,
});
