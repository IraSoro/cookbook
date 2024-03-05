import { useRef } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "../app/globals.css";

import { Item } from "../components/item";

const Page = () => {
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const clearRef = () => {
    if (nameRef.current?.value){
        nameRef.current.value = "";
    }
    if (descriptionRef.current?.value){
        descriptionRef.current.value = "";
    }
  };

  const addItem = (newItem: Item) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("http://localhost:3000/api/main", requestOptions)
      .then(() => {
        console.log("newItem = ", newItem);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
              addItem(newItem);
              clearRef();
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </main>
  );
};

export default Page;
