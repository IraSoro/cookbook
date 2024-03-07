import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";

import AddIcon from "@mui/icons-material/Add";

import { Item } from "../components/item";
import ItemsGrid from "../components/item";
import CreationDialog from "../components/create-form";

import "../app/globals.css";

interface PageProps {
  data: Item[];
}

const Page = (props: PageProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    setItems(props.data);
  }, []);

  const addItem = (newItem: Item) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("http://localhost:3000/api/main", requestOptions)
      .then(() => {
        console.log("added new item: ", newItem);
        items.unshift(newItem);
        setItems([...items]);
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = (idx: number) => {
    fetch("http://localhost:3000/api/main", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idx),
    })
      .then(() => {
        console.log(`deleted ${idx} item`);
        items.splice(idx, 1);
        setItems([...items]);
      })
      .catch((err) => console.log(err));
  };

  const editItem = (idx: number, newItem: Item) => {
    fetch("http://localhost:3000/api/main", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idx, item: newItem }),
    })
      .then(() => {
        console.log(`edited ${idx} item`);
        items[idx] = newItem;
        setItems([...items]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            style={{ backgroundColor: "#d3d3d3" }}
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
      <ItemsGrid items={items} deleteItem={deleteItem} editItem={editItem} />
    </main>
  );
};

export async function getStaticProps() {
  const getFetch = await fetch("http://localhost:3000/api/main");
  const response = await getFetch.json();
  const data = await response.data;

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
