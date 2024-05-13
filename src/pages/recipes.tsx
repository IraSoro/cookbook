import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";

import ItemsGrid from "../components/item";
import { RecipeType } from "@/state/recipe-types";

import { getRequest } from "./api/handlers/apiRequests";

import "../app/globals.css";

interface PageProps {
  data: RecipeType[];
}

const Page = ({ data }: PageProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AppBar
        position="fixed"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            style={{ backgroundColor: "#fefefe" }}
            href="/recipes/create"
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: "70px" }} />
      <ItemsGrid items={data} />
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
