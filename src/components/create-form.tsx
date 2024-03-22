import { useRef, useState, ChangeEvent } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Input from "@mui/material/Input";

import AddIcon from "@mui/icons-material/Add";

import { Item } from "../components/item";

import styles from "./create-form.module.css";

interface PropsDialog {
  open: boolean;
  setOpen: (_newOpen: boolean) => void;

  addItem?: (_newItem: Item, _image: File | null) => void;

  editItem?: (_idx: number, _newItem: Item) => void;
  item?: Item;
  idx?: number;
}

const CreationDialog = (props: PropsDialog) => {
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [image, setImage] = useState<File | null>(null);

  const clearRef = () => {
    if (nameRef.current?.value) {
      nameRef.current.value = "";
    }
    if (descriptionRef.current?.value) {
      descriptionRef.current.value = "";
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files?.[0];
      setImage(file);
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
            id: props.item?.id || 0,
            name: nameRef.current?.value as string,
            description: descriptionRef.current?.value as string,
            image: props.item?.image || "",
          };
          if (props.addItem) {
            props.addItem(newItem, image);
          }
          if (props.editItem && props.idx != undefined) {
            props.editItem(props.idx, newItem);
          }
          clearRef();
          setImage(null);
          props.setOpen(false);
        },
      }}
    >
      <DialogContent className={styles.dialogContent}>
        <Box
          my={4}
          gap={4}
          p={2}
          sx={{
            backgroundColor: "#fefefe",
            width: "600px",
            height: "600px",
            "@media (max-width: 600px)": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <Stack spacing={3}>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              style={{ display: "none" }}
              id="image-upload-input"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload-input">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  border: "solid #dedede",
                  height: "200px",
                  backgroundImage: image
                    ? `url(${URL.createObjectURL(image)})`
                    : "none",
                }}
              >
                <IconButton component="span">
                  <AddIcon />
                </IconButton>
              </Box>
            </label>
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
