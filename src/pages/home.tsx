import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ItemsGrid from "../components/item";
import Categories from "@/components/categories";
import { RecipeType } from "@/state/recipe-types";

import { getCategories, getRequest } from "./api/handlers/apiRequests";

import "../app/globals.css";

interface PageProps {
  recipes: RecipeType[];
  categories: string[];
}

const Page = (props: PageProps) => {
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
        <Categories categories={props.categories} />
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#000", margin: "20px 0 10px" }}
        >
          All Recipes
        </Typography>
        <ItemsGrid items={props.recipes} />
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const recipes = await getRequest();
  const categories = await getCategories();

  if (!recipes) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipes: recipes,
      categories: categories,
    },
  };
}

export default Page;
