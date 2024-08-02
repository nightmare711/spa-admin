import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "../pages/contact";

export const Route = createFileRoute("/lien-he")({
	component: Contact,
});
