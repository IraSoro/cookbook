import { useRef } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { Item } from "../components/item";

import styles from "./create-form.module.css";

interface PropsDialog {
  open: boolean;
  setOpen: (newOpen: boolean) => void;

  addItem?: (newItem: Item) => void;

  editItem?: (idx: number, newItem: Item) => void;
  item?: Item;
  idx?: number;
}

const CreationDialog = (props: PropsDialog) => {
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const clearRef = () => {
    if (nameRef.current?.value) {
      nameRef.current.value = "";
    }
    if (descriptionRef.current?.value) {
      descriptionRef.current.value = "";
    }
  };

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={() => props.setOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          const newItem: Item = {
            name: nameRef.current?.value as string,
            description: descriptionRef.current?.value as string,
          };
          if (props.addItem) {
            props.addItem(newItem);
          }
          if (props.editItem && props.idx != undefined) {
            props.editItem(props.idx, newItem);
          }
          clearRef();
          props.setOpen(false);
        },
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <Box
          height={600}
          width={600}
          my={4}
          gap={4}
          p={2}
          sx={{ backgroundColor: "#fefefe" }}
        >
          <Stack spacing={3}>
            <TextField
              style={{ marginTop: "10px" }}
              id="standard-multiline-flexible"
              label="Name"
              multiline
              inputRef={nameRef}
              defaultValue={props.item?.name || ""}
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              inputRef={descriptionRef}
              defaultValue={props.item?.description || ""}
            />
            <Button type="submit" color="inherit">
              Save
            </Button>
            <Button color="inherit" onClick={() => props.setOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreationDialog;
