import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";

import Image from "next/image";

import { RecipeType } from "@/state/recipe-types";

interface PropsItem {
  item: RecipeType;
  idx: number;
}

const Item = (props: PropsItem) => {
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
      <ImageListItem key={props.idx}>
        <Link href={`/recipes/${props.item.id}`}>
          <Box
            sx={{
              height: 450,
              maxWidth: 350,
              "@media (max-width: 600px)": {
                height: 250,
                maxWidth: 180,
              },
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              height={0}
              width={0}
              src={image}
              alt={props.item.name}
              loading="lazy"
            />
          </Box>
        </Link>
        <ImageListItemBar title={props.item.name} position="below" />
      </ImageListItem>
    </>
  );
};

interface PropsItems {
  items: RecipeType[];
}

const ItemsGrid = (props: PropsItems) => {
  return (
    <Grid container spacing={{ xs: 1, md: 2 }}>
      {Array.from(props.items).map((item, idx) => (
        <Grid item xs={6} sm={6} md={4} key={idx}>
          <Item item={item} idx={idx} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsGrid;
