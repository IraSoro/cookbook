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
  Box,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

import ItemsGrid from "../components/item";
import Categories from "@/components/categories";
import HelpButton from "@/components/help-button";
import { RecipeType } from "@/state/recipe-types";
import { CategoryType } from "@/state/category-type";

import {
  getCategories,
  getRequest,
  postAdditionCategoryRequest,
} from "./api/handlers/apiRequests";

import "../app/globals.css";

const Page = () => {
  const router = useRouter();
  const currentPageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/auth");
    }
    getRequest().then((res) => {
      setRecipes(res);
    });
    getCategories().then((res) => {
      setCategories(res);
    });
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

  const handleTickets = () => {
    router.push("/help");
  };

  return (
    <main>
      <Box
        sx={{
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: "0 auto",
        }}
      >
        <AppBar
          position="static"
          style={{
            boxShadow: "none",
            backgroundColor: "transparent",
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
              <MenuItem onClick={handleTickets}>
                <ContactSupportIcon />
                Support tickets
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container>
          <Categories categories={categories} update={updateCategories} />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#000", margin: "20px 0 10px" }}
          >
            All Recipes
          </Typography>
          <ItemsGrid items={recipes} />
          <HelpButton currentPageUrl={currentPageUrl} />
        </Container>
      </Box>
    </main>
  );
};

export default Page;
