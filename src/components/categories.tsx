import { useState } from "react";

import { Typography, Grid, Link, Button } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { CategoryType } from "@/state/category-type";
import AddCategoryDialog from "@/components/create-category-form";

interface CategoriesProps {
  categories: CategoryType[];
  update: (_newCategory: CategoryType) => void;
}

const Categories = (props: CategoriesProps) => {
  const defaultLimitCategories = 3;
  const [limitCategories, setLimitCategories] = useState(
    defaultLimitCategories,
  );
  const [isSeeAll, setIsSeeAll] = useState(false);

  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);

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
              onClick={() => {
                setIsOpenAddDialog(true);
              }}
            >
              Add new
            </Button>
            <AddCategoryDialog
              open={isOpenAddDialog}
              setOpen={setIsOpenAddDialog}
              updateCategories={props.update}
            />
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
                href={`/categories/${category.id}`}
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Typography>{category.name}</Typography>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Categories;
