import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Item } from "@/components/item";
import Recipe from "@/components/recipe-form";

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

import { getRequest, deleteRequest } from "../api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";
import { useState } from "react";

interface Props {
  item: Item;
}

const RecipePage: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteRequest(item.id, item.image);
    router.push("/recipes");
  };
  const handleEdit = async () => {
    router.push(`/recipes/edit/${item.id}`);
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
          <IconButton href="/recipes" size="large" color="default">
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
        <Recipe item={item} />
      </Container>
    </main>
  );
};

export async function getStaticPaths() {
  const data = await getRequest();

  const paths = data.map((item: Item) => ({
    params: { id: item.id.toString() },
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
  const data = await getRequest();
  const item = data.find((item: Item) => item.id.toString() === id);

  return {
    props: {
      item,
    },
  };
};

export default RecipePage;
