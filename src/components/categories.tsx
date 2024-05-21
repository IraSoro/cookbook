import { Typography, Grid, Link, Stack } from "@mui/material";

import EggAltIcon from "@mui/icons-material/EggAlt";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import CookieIcon from "@mui/icons-material/Cookie";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

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
  update: (_newCategory: string) => void;
}

const Categories = (props: CategoriesProps) => {
  return (
    <>
      <Typography variant="h6">Categories</Typography>
      <Grid container spacing={1}>
        {props.categories.map((category, index) => (
          <Grid item xs={6} sm={4} key={index}>
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
