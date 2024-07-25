import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "../pages/contact";

export const Route = createFileRoute("/contact")({
	component: Contact,
});
