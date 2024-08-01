import { createFileRoute } from "@tanstack/react-router";
import { Password } from "../pages/password";

export const Route = createFileRoute("/password")({
	component: Password,
});
