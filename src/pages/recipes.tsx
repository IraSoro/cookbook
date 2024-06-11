import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Grid,
  Button,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

import { debounce } from "../data/utils";

import ItemsGrid from "../components/item";
import Tags from "@/components/tags";
import HelpButton from "@/components/help-button";

import { RecipeType } from "@/state/recipe-types";

import { getRequest } from "./api/handlers/apiRequests";

import "../app/globals.css";

const Page = () => {
  const router = useRouter();
  const currentPageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  const [data, setData] = useState<RecipeType[]>([]);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    getRequest()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log("err = ", err);
      });
  }, []);

  function onQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    debounce(() => {
      setSearch(event.target.value);
    }, 1 * 1000);
  }

  const handleHomeClick = () => {
    const localStorageData = localStorage.getItem("username");
    if (localStorageData) {
      router.push("/home");
    } else {
      router.push("/auth");
    }
  };

  return (
    <main>
      <Box
        sx={{
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: "0 auto",
        }}
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="text"
              startIcon={<HomeIcon />}
              sx={{ color: "black" }}
              onClick={handleHomeClick}
            >
              Home
            </Button>
          </div>
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
          <HelpButton currentPageUrl={currentPageUrl} />
        </Container>
      </Box>
    </main>
  );
};

export default Page;
