import { useState } from "react";

import {
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { debounce } from "../data/utils";

import ItemsGrid from "../components/item";
import Tags from "@/components/tags";
import { RecipeType } from "@/state/recipe-types";

import { getRequest } from "./api/handlers/apiRequests";

import "../app/globals.css";

interface PageProps {
  data: RecipeType[];
}

const Page = ({ data }: PageProps) => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function onQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    debounce(() => {
      setSearch(event.target.value);
    }, 1 * 1000);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: 1000,
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{ marginBottom: "15px", marginTop: "15px" }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              sx={{ backgroundColor: "#ededed" }}
              label="Search keywords..."
              variant="outlined"
              onChange={onQueryChange}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Tags tags={tags} setTags={setTags} />
          </Grid>
        </Grid>

        <ItemsGrid items={data} />
      </Box>
    </main>
  );
};

export async function getStaticProps() {
  const data = await getRequest();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
}

export default Page;
