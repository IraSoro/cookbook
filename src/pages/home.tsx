import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import ItemsGrid from "../components/item";
import Categories from "@/components/categories";
import { RecipeType } from "@/state/recipe-types";
import { CategoryType } from "@/state/category-type";

import {
  getCategories,
  getRequest,
  postAdditionCategoryRequest,
} from "./api/handlers/apiRequests";

import "../app/globals.css";

interface PageProps {
  recipes: RecipeType[];
  categories: CategoryType[];
}

const Page = (props: PageProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<CategoryType[]>(
    props.categories
  );

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/auth");
    }
  }, [router]);

  const updateCategories = async (newCategory: CategoryType) => {
    await postAdditionCategoryRequest(newCategory);
    categories.push(newCategory);
    setCategories([...categories]);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddRecipe = () => {
    router.push("/recipes/create");
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/recipes");
  };

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
            edge="start"
            color="default"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleAddRecipe}>
              <AddIcon />
              Added recipe
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div style={{ margin: "20px 10px 0", maxWidth: "1000px" }}>
        <Categories categories={props.categories} update={updateCategories} />
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
