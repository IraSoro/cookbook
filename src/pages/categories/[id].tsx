import { useState } from "react";

import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";

import ItemsGrid from "@/components/item";

import { RecipeType } from "@/state/recipe-types";
import { CategoryType } from "@/state/category-type";
import { getRequest, getCategories } from "../api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface Props {
  category: CategoryType;
  recipes: RecipeType[];
}

const CategoryPage = (props: Props) => {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/categories/edit/${props.category}`);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <main className={styles.backgroundPage}>
      <AppBar
        position="static"
        style={{
          boxShadow: "none",
          maxWidth: "1000px",
          backgroundColor: "#fefefe",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton href="/home" size="large" color="default">
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            size="large"
            color="default"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Button
                color="inherit"
                onClick={handleEdit}
                startIcon={<EditIcon />}
              >
                Edit category
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          maxWidth: "1000px",
          backgroundColor: "#fefefe",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography
            color="#474d4e"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "4rem",
              "@media (max-width: 600px)": {
                fontSize: "3rem",
              },
              fontWeight: "bold",
            }}
          >
            {props.category.name}
          </Typography>
          <ItemsGrid items={props.recipes} />
        </Stack>
      </Container>
    </main>
  );
};

export async function getStaticPaths() {
  const data = await getCategories();
  const paths = data.map((category: CategoryType) => ({
    params: { id: category.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const id = params.id;
  const data = await getCategories();

  const category = data.find((item: CategoryType) => item.id.toString() === id);
  const recipes = await getRequest();

  return {
    props: {
      category: category,
      recipes: recipes,
    },
  };
};

export default CategoryPage;
