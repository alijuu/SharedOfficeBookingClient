import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GridTableEditor from "../../components/GridTableEditor.tsx";

import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import { useState } from "react";

export const Route = createFileRoute("/_auth/create")({
  component: CreateWorkspace,
});
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  CreateWorkspaceDto,
  useCreateWorkspace,
} from "../../http/workspace/data.ts";
import { Controller, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useWorkspaceForm } from "../../resources/workspaces/useForm.ts";
// ...

function CreateWorkspace() {
  const { mutate, isPending } = useCreateWorkspace();
  const [open, setOpen] = useState(false);
  // const [form, setForm] = useState({
  //   name: "",
  //   address: "",
  //   email: "",
  //   phone: "",
  //   description: "",
  //   imageUrl: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const { control, handleSubmit, setValue } = useForm({
    resolver: valibotResolver(useWorkspaceForm()),
  });
  const navigate = useNavigate();
  const onSubmit = (data: CreateWorkspaceDto) => {
    console.log("Workspace submitted:", data);
    createWorkspace(data);
    // Ovdje ide poziv prema backendu kad ga budete imali
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
    <Box>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
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
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}
