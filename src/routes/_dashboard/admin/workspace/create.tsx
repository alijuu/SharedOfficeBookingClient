import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useWorkspaceForm } from "../../../../resources/workspaces/useForm";
import { useCreateWorkspace } from "../../../../http/workspace/data";
import { CreateWorkspaceDto } from "../../../../http/workspace/data.ts";
import GridTableEditor from "../../../../components/GridTableEditor.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Route = createFileRoute("/_dashboard/admin/workspace/create")({
  component: CreateWorkspace,
});

function CreateWorkspace() {
  const { mutate, isPending } = useCreateWorkspace();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: valibotResolver(useWorkspaceForm()),
  });
  const floorPlan = watch("floorPlan");
  const navigate = useNavigate();
  const onSubmit = (data: CreateWorkspaceDto) => {
    console.log("Workspace submitted:", data);
    createWorkspace(data);
  };

  const createWorkspace = (data: CreateWorkspaceDto) => {
    mutate(data, {
      onSuccess: () => {
        navigate({ to: "/home" });
      },
    });
  };

  const updateFloorPlan = (floorPlan: number[][]): void => {
    setValue("floorPlan", floorPlan);
  };
  return (
    <Paper sx={{ padding: 3, paddingBottom: 10 }}>
      <IconButton
        onClick={() => navigate({ to: "/admin/workspace" })}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "80%", mt: 4, mx: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Create New Workspace
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="imageUrl"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Image URL"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
              <Button variant="outlined" onClick={() => setOpen(true)}>
                Add Floor Plan
              </Button>
              <Button type="submit" variant="contained" disabled={isPending}>
                Submit
              </Button>
            </Stack>
          </form>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Add Floor Plan</DialogTitle>
            <DialogContent>
              <GridTableEditor
                updateFloorPlan={updateFloorPlan}
                setOpen={setOpen}
                initialGrid={floorPlan}
              />
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Paper>
  );
}
