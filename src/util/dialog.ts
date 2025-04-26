export interface DialogStateRef<OpenFn = () => void> {
  preventClose: boolean;
  openDialog: OpenFn;
  closeDialog: () => void;
  setPreventClose: (value: boolean) => void;
}

// const dialogRef = useRef<DialogStateRef<(id?: string) => void>>({
//     closeDialog: () => {},
//     openDialog: () => {},
//     preventClose: false,
//     setPreventClose: () => {},
// })
