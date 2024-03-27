import { useEffect, useState } from "react";

import {
  CardActions,
  IconButton,
  Box,
  Grid,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import CreationDialog from "../components/create-form";

export interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface PropsItem {
  item: Item;
  idx: number;
  deleteItem: (_idx: number) => void;
  editItem: (_idx: number, _newItem: Item, _image: File | null) => void;
}

const Item = (props: PropsItem) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const defaultImage = "/default.jpg";
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    if (!props.item.image) {
      setImage(defaultImage);
      return;
    }
    const imageUrl = `/data/${props.item.image}`;

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        setImage(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [props.item]);

  return (
    <>
      <ImageListItem
        key={props.idx}
        onClick={() => {
          setIsEditOpen(true);
        }}
      >
        <img
          style={{ minHeight: 200 }}
          srcSet={image}
          src={image}
          alt={props.item.name}
          loading="lazy"
        />
        <ImageListItemBar title={props.item.name} position="below" />
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete"
            onClick={() => {
              props.deleteItem(props.idx);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </ImageListItem>
      <CreationDialog
        open={isEditOpen}
        setOpen={setIsEditOpen}
        idx={props.idx}
        item={props.item}
        editItem={props.editItem}
      />
    </>
  );
};

interface PropsItems {
  items: Item[];
  deleteItem: (_idx: number) => void;
  editItem: (_idx: number, _newItem: Item, _image: File | null) => void;
}

const ItemsGrid = (props: PropsItems) => {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1000 }}>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {Array.from(props.items).map((item, idx) => (
          <Grid item xs={6} sm={6} md={4} key={idx}>
            <Item
              item={item}
              idx={idx}
              deleteItem={props.deleteItem}
              editItem={props.editItem}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsGrid;
