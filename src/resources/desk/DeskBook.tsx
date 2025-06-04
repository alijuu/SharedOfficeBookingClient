import { useRef } from "react";
import { DialogStateRef } from "../../util/dialog.ts";
import { DeskBookFormDialog } from "./DeskBookFormDialog.tsx";
import Desk from "../../assets/desk.svg?react";
import YellowDesk from "../../assets/partiallyBookedDesk.svg?react";
import RedDesk from "../../assets/bookedDesk.svg?react";
import { DeskStatus } from "../../components/TableBooking/DeskBooking.tsx";

export function DeskBook({ id, status }: { id?: string; status: DeskStatus }) {
  const dialogRef = useRef<DialogStateRef<(id?: string) => void>>({
    closeDialog: () => {},
    openDialog: () => {},
    preventClose: false,
    setPreventClose: () => {},
  });

  const handleClick = () => {
    dialogRef.current.openDialog(id);
  };

  const renderDeskIcon = () => {
    switch (status) {
      case "available":
        return <Desk onClick={handleClick} />;
      case "partial":
        return <YellowDesk onClick={handleClick} />;
      case "booked":
        return <RedDesk onClick={handleClick} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderDeskIcon()}
      {id && <DeskBookFormDialog deskId={id} ref={dialogRef} />}
    </>
  );
}
