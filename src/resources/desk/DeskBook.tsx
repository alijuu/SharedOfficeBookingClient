import { useRef } from "react";
import { DialogStateRef } from "../../util/dialog.ts";
import { DeskBookFormDialog } from "./DeskBookFormDialog.tsx";
import Desk from "../../assets/desk.svg?react";

export function DeskBook({ id }: { id: string }) {
  const dialogRef = useRef<DialogStateRef<(id?: string) => void>>({
    closeDialog: () => {},
    openDialog: () => {},
    preventClose: false,
    setPreventClose: () => {},
  });

  return (
    <>
      <Desk onClick={() => dialogRef.current.openDialog()} />
      <DeskBookFormDialog deskId={id} ref={dialogRef} />
    </>
  );
}
