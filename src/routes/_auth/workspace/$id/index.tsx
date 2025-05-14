import { createFileRoute } from "@tanstack/react-router";
import WorkspaceDetails from "../../../../components/WorkspaceDetails.tsx";

export const Route = createFileRoute("/_auth/workspace/$id/")({
  component: WorkspaceDetails,
});
