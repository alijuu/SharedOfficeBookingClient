import { createFileRoute } from '@tanstack/react-router';
import {BaseLayout} from '../components/layout/BaseLayout';
import GridTableEditor from '../components/GridTableEditor';

import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';

export const Route = createFileRoute('/create')({
  component: CreateWorkspace,
});
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
// ...



function CreateWorkspace() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Workspace submitted:', form);
    // Ovdje ide poziv prema backendu kad ga budete imali
  };

  return (
      <BaseLayout>
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Create New Workspace
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
              <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth required />
              <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required type="email" />
              <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth required />
              <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
              <TextField label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} fullWidth />
              <Button type="submit" variant="contained">Submit</Button>
              <Button variant="outlined" onClick={() => setOpen(true)}>
                Add Floor Plan
              </Button>

            </Stack>
          </form>
          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
            <DialogTitle>Add Floor Plan</DialogTitle>
            <DialogContent>
              <GridTableEditor />
            </DialogContent>
          </Dialog>

        </Box>
      </BaseLayout>
  );
}
