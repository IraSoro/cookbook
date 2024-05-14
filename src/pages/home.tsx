import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ItemsGrid from "../components/item";
import Categories from "@/components/categories";
import { RecipeType } from "@/state/recipe-types";

import { getRequest } from "./api/handlers/apiRequests";

import "../app/globals.css";

interface PageProps {
  data: RecipeType[];
}

const TempCategories = ["Soups", "Breakfast", "Desserts", "Snacks", "Vegan"];

const Page = ({ data }: PageProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AppBar
        position="static"
        style={{
          boxShadow: "none",
          backgroundColor: "transparent",
          maxWidth: "1000px",
        }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="div" sx={{ color: "#000" }}>
            My Recipes
          </Typography>
          <IconButton
            style={{ backgroundColor: "#fefefe" }}
            href="/recipes/create"
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ margin: "20px 10px 0", maxWidth: "1000px" }}>
        <Categories categories={TempCategories} />
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#000", margin: "20px 0 10px" }}
        >
          All Recipes
        </Typography>
        <ItemsGrid items={data} />
      </div>
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
