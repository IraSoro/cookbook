import { useRef } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Item } from "../components/item";

interface PropsForm {
  addItem: (newItem: Item) => void;
}

const CreationForm = (props: PropsForm) => {
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
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          inputRef={descriptionRef}
        />
        <Button
          type="submit"
          color="inherit"
          onClick={() => {
            const newItem: Item = {
              name: nameRef.current?.value as string,
              description: descriptionRef.current?.value as string,
            };
            props.addItem(newItem);
            clearRef();
          }}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default CreationForm;
