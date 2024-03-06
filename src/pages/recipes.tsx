import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import ItemsGrid from "../components/item";
import { Item } from "../components/item";

import "../app/globals.css";

interface PageProps {
  data: Item[];
}

const Page = (props: PageProps) => {
  const deleteItem = (idx: number) => {
    fetch("http://localhost:3000/api/main", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idx),
    })
      .then(() => {
        console.log(`deleted ${idx} item`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0 }}
        style={{ backgroundColor: "#D3D3D3" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ItemsGrid items={props.data} deleteItem={deleteItem} />
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
