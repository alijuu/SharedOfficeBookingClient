import { RefObject, useImperativeHandle, useState } from "react";
import { DialogStateRef } from "./dialog";
import { Dialog } from "@mui/material";
export interface DialogProps {
  ref: RefObject<DialogStateRef<(id?: string) => void>>;
  // children?: React.ReactNode;
}

export default function MyDialog({ ref }: DialogProps) {
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
    ></Dialog>
  );
}
