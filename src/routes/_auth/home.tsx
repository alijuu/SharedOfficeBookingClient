import { createFileRoute } from "@tanstack/react-router";
import { useGetAllWorkspaces } from "../../http/workspace/data.ts";
import WorkspaceCard from "../../components/WorkspaceCard.tsx";
import { Box, CircularProgress } from "@mui/material";
import HomeLayout  from "../../components/layout/HomeLayout.tsx";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
    component: RouteComponent,
    pendingComponent: () => <CircularProgress color="inherit" />,
});

function RouteComponent() {
    const { data, isLoading } = useGetAllWorkspaces();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <HomeLayout>
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            </HomeLayout>
        );
    }

    const items = data?.items ?? [];

    return (
        <HomeLayout>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {items.map((workspace) => (
                    <WorkspaceCard
                        key={workspace.id}
                        id={String(workspace.id)}
                        name={workspace.name}
                        address={workspace.address}
                        description={workspace.description}
                        imageUrl={workspace.imageUrl}
                        onViewDetails={() => navigate({ to: `workspace/${workspace.id}` })}  // ✅ Navigacija ka pravilnoj ruti
                    />
                ))}
            </Box>
        </HomeLayout>
    );
}
