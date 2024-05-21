import { useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

import { CategoryType } from "@/state/category-type";

interface AddCategoryDialogProps {
  open: boolean;
  setOpen: (_open: boolean) => void;

  updateCategories: (_newCategory: CategoryType) => void;
  editedCategory?: CategoryType;
}

const AddCategoryDialog = (props: AddCategoryDialogProps) => {
  const [newCategoryName, setNewCategoryName] = useState(
    props.editedCategory?.name || "",
  );

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={() => {
        props.setOpen(false);
      }}
    >
      {props.editedCategory ? (
        <DialogTitle>Edit Category</DialogTitle>
      ) : (
        <DialogTitle>New Category</DialogTitle>
      )}
      <DialogContent>
        <TextField
          fullWidth
          style={{ marginTop: "10px" }}
          label="Category name"
          variant="outlined"
          value={newCategoryName}
          onChange={(e) => {
            setNewCategoryName(e.target.value);
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
            props.updateCategories({
              id: props.editedCategory?.id || 0,
              name: newCategoryName,
            });
            setNewCategoryName("");
            props.setOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
