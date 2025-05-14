import { RefObject, useContext, useImperativeHandle, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DialogStateRef } from "../../util/dialog.ts";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useCreateBooking } from "../../http/workspace/data.ts";
import { AuthContext } from "../../context/auth/AuthContext.ts";
import { ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "@tanstack/react-router";

interface DeskBookFormDialogProps {
  deskId: string;
  ref: RefObject<DialogStateRef<(id?: string) => void>>;
}
const BOOKING_TYPES = ["Hour", "Half-day", "Full-day"] as const;

function DeskBook({
  deskId,
  dialogRef,
}: {
  deskId: string;
  dialogRef: RefObject<DialogStateRef<(id?: string) => void>>;
}) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  type bookTable = {
    startTime: DateTime;
    endTime: DateTime;
    deskId: string;
    type: string;
  };
  const { control, handleSubmit, watch } = useForm<bookTable>({
    defaultValues: {
      startTime: DateTime.now().set({
        hour: 9,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      deskId: deskId,
      type: "",
    },
  });
  const { mutate, isPending, error } = useCreateBooking();

  const onSubmit = (data: bookTable) => {
    console.log(data);
    const payload = {
      ...data,
      startTime: data.startTime?.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"),
      endTime: data.endTime?.toUTC().toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'"),
      userId: auth?.user?.id ?? "",
      type: 0,
    };
    mutate(payload, {
      onSuccess: async () => {
        dialogRef.current.closeDialog();
        await navigate({ to: "/home" });
      },
    });
    console.log(payload, "SADS");
  };
  const bookingType = watch("type");
  console.log(bookingType);
  const minDateTime = DateTime.local().set({
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const maxTime = DateTime.local().set({
    hour: 17,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  return (
    <>
      <DialogTitle>Book a tablet</DialogTitle>
      <DialogContent
        sx={{
          position: "relative",
        }}
      >
        <Backdrop open={isPending} sx={{ position: "absolute" }}>
          <CircularProgress />
        </Backdrop>
        <Box
          component="form"
          id="booking-form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 3, width: "100%", height: "100%" }}
        >
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Booking Type</InputLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Booking Type">
                    {BOOKING_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            {(bookingType === "Hour" ||
              bookingType === "Half-day" ||
              bookingType === "Full-day") && (
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Start Time"
                    ampm={false}
                    views={["year", "month", "day", "hours"]}
                    minDateTime={minDateTime}
                    maxTime={maxTime}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
            )}
            {bookingType === "Hour" && (
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="End Time"
                    ampm={false}
                    views={["year", "month", "day", "hours"]}
                    minDateTime={minDateTime}
                    maxTime={maxTime}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
            )}
            {
              // @ts-ignore
              error?.response?.data?.message && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start", // Align to the left
                    alignItems: "center",
                    color: "error.main",
                    mt: 1,
                    width: "100%",
                  }}
                >
                  <ErrorOutline fontSize="small" sx={{ marginRight: 1 }} />
                  <Typography variant="body2">
                    {
                      // @ts-ignore
                      error.response.data.message
                    }
                  </Typography>
                </Box>
              )
            }
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogRef.current.closeDialog()}>Cancel</Button>
        <Button
          form="booking-form"
          color="primary"
          variant="contained"
          type="submit"
        >
          Book
        </Button>
      </DialogActions>
    </>
  );
}

export function DeskBookFormDialog({ deskId, ref }: DeskBookFormDialogProps) {
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
      <DeskBook deskId={deskId} dialogRef={ref} />
    </Dialog>
  );
}
