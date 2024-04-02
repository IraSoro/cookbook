import { useRef, useState, ChangeEvent, useEffect } from "react";
import {
  Stack,
  TextField,
  Button,
  IconButton,
  Box,
  Input,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { Item } from "../components/item";

interface PropsEdit {
  editItem: (_newItem: Item, _image: File | null) => void;
  item: Item;
}

const Editor = (props: PropsEdit) => {
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!props.editItem || !props.item) return;
    fetch(`/data/${props.item.image}`)
      .then((response) => response.blob())
      .then((blob) => {
        if (!props.item) return;
        const file = new File([blob], props.item.image, { type: "image/jpeg" });
        setImage(file);
      })
      .catch((error) => {
        console.error("Failed to load default image:", error);
      });
  }, [props.item, props.editItem]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files?.[0];
      setImage(file);
    }
  };

  return (
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
          defaultValue={props.item.name}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          inputRef={descriptionRef}
          defaultValue={props.item.description}
        />
        <Button
          color="inherit"
          onClick={() => {
            const newItem: Item = {
              id: props.item.id,
              name: nameRef.current?.value as string,
              description: descriptionRef.current?.value as string,
              image: props.item.image,
            };
            props.editItem(newItem, image);
          }}
        >
          Save
        </Button>
        <Button href={`/recipes/${props.item.id}`} color="inherit">
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default Editor;
