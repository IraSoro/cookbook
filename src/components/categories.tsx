import { useState } from "react";

import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CategoriesDialogProps {
  categories: string[];

  open: boolean;
  setOpen: (_open: boolean) => void;
}

const CategoriesDialog = (props: CategoriesDialogProps) => {
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
          onClick={() => {}}
          style={{
            height: "50px",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        >
          Add new category
        </Button>
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
}

const Categories = (props: CategoriesProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
        <Button startIcon={<AddIcon />} variant="outlined">
          Add new
        </Button>
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
        />
      </Grid>
    </>
  );
};

export default Categories;
