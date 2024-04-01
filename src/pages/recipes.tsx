import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import { Item } from "../components/item";
import ItemsGrid from "../components/item";
import CreationDialog from "../components/create-form";

import { getRequest, postAdditionRequest } from "./api/handlers/apiRequests";

import "../app/globals.css";

interface PageProps {
  data: Item[];
}

const Page = ({ data }: PageProps) => {
  const [items, setItems] = useState(data);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const addItem = (newItem: Item, image: File | null) => {
    if (items.length > 0) {
      newItem.id = items[0].id + 1;
    }
    function update() {
      items.unshift(newItem);
      setItems([...items]);
    }
    postAdditionRequest(newItem, image, update);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            style={{ backgroundColor: "#fefefe" }}
            onClick={() => setIsAddOpen(true)}
          >
            <AddIcon />
          </IconButton>
          <CreationDialog
            open={isAddOpen}
            setOpen={setIsAddOpen}
            addItem={addItem}
          />
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "70px" }} />
      <ItemsGrid items={items} />
    </main>
  );
};

export async function getStaticProps() {
  const data = await getRequest();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
}

export default Page;
