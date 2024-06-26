import { useEffect, useState } from "react";

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
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import Recipe from "@/components/recipe-form";
import { getRequest, deleteRequest } from "../api/handlers/apiRequests";
import { RecipeType, EmptyRecipe } from "@/state/recipe-types";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface Props {
  id: string;
}

const RecipePage = ({ id }: Props) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeType>(EmptyRecipe);
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username && username === recipe.username) {
      setIsShowMenu(true);
    }
    getRequest().then((res) => {
      setRecipe(res.find((recipe: RecipeType) => recipe.id.toString() === id));
    });
  }, [recipe.username]);

  const handleDelete = async () => {
    router.push("/home");
    await deleteRequest(recipe.id, recipe.image);
  };
  const handleEdit = async () => {
    router.push(`/recipes/edit/${recipe.id}`);
  };
  const handleBack = () => {
    router.back();
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
          maxWidth: "800px",
          backgroundColor: "#fefefe",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          {isShowMenu && (
            <>
              <IconButton onClick={handleBack} size="large" color="default">
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
            </>
          )}
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
                Edit recipe
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteOutlineIcon />}
              >
                Delete recipe
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          maxWidth: "800px",
          backgroundColor: "#fefefe",
        }}
      >
        <Recipe recipe={recipe} />
      </Container>
    </main>
  );
};

export async function getStaticPaths() {
  const data = Array.from({ length: 1000 }, (_, index) => index + 1);
  const paths = data.map((el: number) => ({
    params: { id: el.toString() },
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

  return {
    props: {
      id,
    },
  };
};

export default RecipePage;
