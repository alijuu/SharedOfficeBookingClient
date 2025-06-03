import { Button } from "@mui/material";
import { DeleteWorkspaceDialog } from "../../components/Dialog/DeleteDialog.tsx";
import { useRef } from "react";
import { DialogStateRef } from "../../util/dialog.ts";

export function DeleteWorkspaceButton({ id }: { id: string }) {
  const dialogRef = useRef<DialogStateRef<(id?: string) => void>>({
    closeDialog: () => {},
    openDialog: () => {},
    preventClose: false,
    setPreventClose: () => {},
  });
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="error"
        onClick={() => dialogRef.current.openDialog()}
      >
        Delete
      </Button>
      <DeleteWorkspaceDialog ref={dialogRef} id={id} />
    </>
  );
}
