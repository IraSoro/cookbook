import { useState, useReducer } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import { Item } from "../components/item";
import ItemsGrid from "../components/item";
import CreationDialog from "../components/create-form";

import "../app/globals.css";

enum ActionType {
  Set,
  Added,
  Changed,
  Deleted,
}

interface Action {
  type: ActionType;
  id?: number;
  item?: Item;
  items?: Item[];
}

function itemsReducer(items: Item[], action: Action): Item[] {
  switch (action.type) {
    case ActionType.Set:
      return action.items ? action.items : [];
    case ActionType.Added: {
      console.log("added new item: ", action.item);
      return action.item ? [action.item, ...items] : items;
    }
    case ActionType.Changed: {
      console.log(`edited ${action.id} item`);
      if (action.id !== undefined && action.item) {
        items[action.id] = action.item;
        return [...items];
      } else {
        return items;
      }
    }
    case ActionType.Deleted: {
      console.log(`deleted ${action.id} item`);
      if (action.id !== undefined) {
        items.splice(action.id, 1);
        return [...items];
      } else {
        return items;
      }
    }
    default: {
      console.log("Unknown action: " + action.type);
      return items;
    }
  }
}

interface PageProps {
  data: Item[];
}

const Page = (props: PageProps) => {
  const [items, dispatch] = useReducer(itemsReducer, props.data);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const addItem = (newItem: Item, image: File | null) => {
    if (items.length > 0) {
      newItem.id = items[0].id + 1;
    }
    const formData = new FormData();
    if (image) {
      newItem.image = `${newItem.id}.jpg`;
      formData.append("filename", newItem.image);
      formData.append("image", image);
    }

    const requestImageUpload = {
      method: "POST",
      body: formData,
    };
    fetch("http://localhost:3000/api/images", requestImageUpload)
      .then(() => {
        console.log("Image uploaded");
      })
      .catch((err) => {
        console.log(err);
      });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("http://localhost:3000/api/main", requestOptions)
      .then(() => {
        dispatch({
          type: ActionType.Added,
          item: newItem,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editItem = (idx: number, newItem: Item, image: File | null) => {
    const formData = new FormData();
    if (image) {
      newItem.image = `${newItem.id}.jpg`;
      formData.append("filename", newItem.image);
      formData.append("image", image);
    }

    fetch("http://localhost:3000/api/images", {
      method: "PATCH",
      body: formData,
    })
      .then(() => {
        console.log("Image edited");
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3000/api/main", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idx, item: newItem }),
    })
      .then(() => {
        dispatch({
          type: ActionType.Changed,
          id: idx,
          item: newItem,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = (idx: number) => {
    fetch("http://localhost:3000/api/images", {
      method: "DELETE",
      body: JSON.stringify(items[idx].image),
    })
      .then(() => {
        console.log("Image deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3000/api/main", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idx),
    })
      .then(() => {
        dispatch({
          type: ActionType.Deleted,
          id: idx,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
