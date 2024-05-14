import { useState } from "react";

import {
  Chip,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface TagsProps {
  tags: string[];
  setTags: (_newTags: string[]) => void;
}

const Tags = (props: TagsProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() !== "" && !props.tags.includes(inputValue)) {
      props.setTags([...props.tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <>
      <TextField
        fullWidth
        sx={{ backgroundColor: "#ededed", marginBottom: "10px" }}
        label="Topic selected"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={1}>
        {props.tags.map((tag, index) => (
          <Grid item key={index}>
            <Chip
              label={tag}
              onDelete={() =>
                props.setTags(props.tags.filter((_, i) => i !== index))
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Tags;
