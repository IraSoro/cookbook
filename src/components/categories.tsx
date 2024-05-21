import { useState } from "react";

import { Typography, Grid, Link, Stack, Button } from "@mui/material";

import EggAltIcon from "@mui/icons-material/EggAlt";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import CookieIcon from "@mui/icons-material/Cookie";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface IconCategoryProps {
  category: string;
}

const IconCategory = ({ category }: IconCategoryProps) => {
  switch (category) {
    case "Breakfast":
      return <EggAltIcon />;
    case "Lunch":
      return <SoupKitchenIcon />;
    case "Dinner":
      return <DinnerDiningIcon />;
    case "Desserts":
      return <CookieIcon />;
    case "Drinks":
      return <FreeBreakfastIcon />;
    case "Snacks":
      return <LocalPizzaIcon />;
    default:
      return <RestaurantMenuIcon />;
  }
};

interface CategoriesProps {
  categories: string[];
}

const Categories = (props: CategoriesProps) => {
  const defaultLimitCategories = 3;
  const [limitCategories, setLimitCategories] = useState(
    defaultLimitCategories
  );
  const [isSeeAll, setIsSeeAll] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6">Categories</Typography>
        <Button
          variant="text"
          style={{ backgroundColor: "transparent" }}
          endIcon={isSeeAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => {
            if (isSeeAll) {
              setIsSeeAll(false);
              setLimitCategories(defaultLimitCategories);
              return;
            }
            setIsSeeAll(true);
            setLimitCategories(props.categories.length);
          }}
        >
          See All
        </Button>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={3} key="button">
          <div
            style={{
              height: "50px",
              backgroundColor: "transparent",
              borderRadius: "8px",
              border: "2px solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={<AddIcon />}
              variant="text"
              style={{ color: "#000" }}
              onClick={() => {}}
            >
              Add new
            </Button>
          </div>
        </Grid>
        {props.categories.slice(0, limitCategories).map((category, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <div
              style={{
                height: "50px",
                backgroundColor: "#ededed",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href={`/categories/${category}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <IconCategory category={category} />
                  <Typography>{category}</Typography>
                </Stack>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Categories;
