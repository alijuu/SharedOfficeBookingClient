import { RefObject, useImperativeHandle, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DialogStateRef } from "../../util/dialog.ts";

interface DeskBookFormDialogProps {
  deskId: string;
  ref: RefObject<DialogStateRef<(id?: string) => void>>;
}

function DeskBook({
  deskId,
  dialogRef,
}: {
  deskId: string;
  dialogRef: RefObject<DialogStateRef<(id?: string) => void>>;
}) {
  return (
    <>
      <DialogTitle>Book a tablet</DialogTitle>
      <DialogContent
        sx={{
          position: "relative",
          height: "100vh",
        }}
      >
        <Backdrop open={false} sx={{ position: "absolute" }}>
          <CircularProgress />
        </Backdrop>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogRef.current.closeDialog()}>Cancel</Button>
        <Button color="primary" variant="contained" type="submit">
          Approve
        </Button>
      </DialogActions>
    </>
  );
}

export function DeskBookFormDialog({ deskId, ref }: DeskBookFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>();
  useImperativeHandle(ref, () => {
    const obj: DialogStateRef<(id?: string) => void> = {
      preventClose: false,
      openDialog: (id) => {
        setId(id);
        setIsOpen(true);
      },
      closeDialog: () => {
        setId(undefined);
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
      <DeskBook deskId={deskId} dialogRef={ref} />
    </Dialog>
  );
}
