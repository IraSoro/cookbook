import { useState } from "react";

import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddCategoryDialogProps {
  open: boolean;
  setOpen: (_open: boolean) => void;

  updateCategories: (_newCategory: string) => void;
}

const AddCategoryDialog = (props: AddCategoryDialogProps) => {
  const [newCategory, setNewCategory] = useState("");
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <DialogTitle>New Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          style={{ marginTop: "10px" }}
          label="New category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpen(false);
          }}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            props.updateCategories(newCategory);
            setNewCategory("");
            props.setOpen(false);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface CategoriesDialogProps {
  categories: string[];
  updateCategories: (_newCategory: string) => void;

  open: boolean;
  setOpen: (_open: boolean) => void;
}

const CategoriesDialog = (props: CategoriesDialogProps) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      <DialogTitle>All Categories</DialogTitle>
      <DialogContent>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => {
            setAddDialogOpen(true);
          }}
          style={{
            height: "50px",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        >
          Add new category
        </Button>
        <AddCategoryDialog
          open={addDialogOpen}
          setOpen={setAddDialogOpen}
          updateCategories={props.updateCategories}
        />
        <Grid container spacing={1}>
          {props.categories.map((category, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              key={index}
              onClick={() => {
                console.log("category");
              }}
            >
              <div
                style={{
                  height: "50px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>{category}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpen(false);
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface CategoriesProps {
  categories: string[];
  update: (_newCategory: string) => void;
}

const Categories = (props: CategoriesProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          See All
        </Button>
      </div>
      <Grid container spacing={1}>
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={() => {
            setAddDialogOpen(true);
          }}
        >
          Add new
        </Button>
        <AddCategoryDialog
          open={addDialogOpen}
          setOpen={setAddDialogOpen}
          updateCategories={props.update}
        />
        {props.categories.slice(0, 2).map((category, index) => (
          <div key={index} onClick={() => {}}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#bababa",
                color: "#000",
                boxShadow: "none",
                marginLeft: "10px",
              }}
              onClick={() => {}}
            >
              {category}
            </Button>
          </div>
        ))}
        <CategoriesDialog
          categories={props.categories}
          open={dialogOpen}
          setOpen={setDialogOpen}
          updateCategories={props.update}
        />
      </Grid>
    </>
  );
};

export default Categories;
