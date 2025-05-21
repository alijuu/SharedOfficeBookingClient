import { RefObject, useImperativeHandle, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DialogStateRef } from "../../util/dialog.ts";
import { useDeleteWorkspace } from "../../http/workspace/data.ts";
import { queryClient } from "../../util/client.ts";

interface DialogProps {
  ref: RefObject<DialogStateRef<(id?: string) => void>>;
  id: string;
}

function DeleteWorkSpace({ ref, id }: DialogProps) {
  const { mutate, isPending } = useDeleteWorkspace();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["workspace"] });
        ref.current.closeDialog();
      },
    });
  };

  return (
    <>
      <DialogTitle>Delete Workspace</DialogTitle>
      <DialogContent sx={{}}>
        <Backdrop open={isPending} sx={{ position: "absolute" }}>
          <CircularProgress />
        </Backdrop>
        <Typography>Are you sure you want to delete this workspace?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => ref.current.closeDialog()}>Cancel</Button>
        <Button
          form="booking-form"
          color="error"
          variant="contained"
          type="submit"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
}

export function DeleteWorkspaceDialog({ id, ref }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const [id, setId] = useState<string>();
  useImperativeHandle(ref, () => {
    const obj: DialogStateRef<(id?: string) => void> = {
      preventClose: false,
      openDialog: () => {
        // setId(id);
        setIsOpen(true);
      },
      closeDialog: () => {
        // setId(undefined);
        setIsOpen(false);
      },
      setPreventClose: (value) => {
        obj.preventClose = value;
      },
    };
    return obj;
  }, []);
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (ref.current.preventClose) {
          return;
        }
        ref.current.closeDialog();
      }}
      fullWidth
    >
      <DeleteWorkSpace ref={ref} id={id} />
    </Dialog>
  );
}
