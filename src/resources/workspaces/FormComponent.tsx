import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import GridTableEditor from "../../components/GridTableEditor.tsx";
import {
  CreateWorkspaceDto,
  useCreateWorkspace,
  useEditWorkspace,
} from "../../http/workspace/data.ts";
import { useState } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useWorkspaceForm } from "./useForm.ts";
import { useNavigate } from "@tanstack/react-router";
import { Workspace } from "./model.ts";

export interface WorkspaceFormProps {
  workspace?: Workspace;
}

export function WorkspaceForm({ workspace }: WorkspaceFormProps) {
  const { mutate: createWorkspace, isPending: isCreatePending } =
    useCreateWorkspace();
  const { mutate: editWorkspace, isPending: isEditPending } =
    useEditWorkspace();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, setValue } = useForm({
    resolver: valibotResolver(useWorkspaceForm()),
    defaultValues: workspace ? { ...workspace } : undefined,
  });

  const navigate = useNavigate();
  const onSubmit = (data: CreateWorkspaceDto) => {
    if (workspace) {
      handleEditWorkspace(data);
    } else handleCreateWorkspace(data);
  };

  const handleCreateWorkspace = (data: CreateWorkspaceDto) => {
    createWorkspace(data, {
      onSuccess: () => {
        navigate({ to: "/home" });
      },
    });
  };
  const handleEditWorkspace = (data: CreateWorkspaceDto) => {
    if (workspace) {
      const serverData = { workspace: data, id: workspace.id.toString() };
      editWorkspace(serverData, {
        onSuccess: () => {
          navigate({ to: "/home" });
        },
      });
    }
  };

  const updateFloorPlan = (floorPlan: number[][]): void => {
    setValue("floorPlan", floorPlan);
  };

  return (
    <Box sx={{ width: "80%", mt: 4, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        {workspace ? "Edit Workspace" : "Create Workspace"}
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
          <Button
            type="submit"
            variant="contained"
            disabled={isCreatePending || isEditPending}
          >
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
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
