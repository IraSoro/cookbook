import { useState } from "react";

import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { TextField, Container, Stack, Button } from "@mui/material";

import { CategoryType } from "@/state/category-type";

import {
  getCategories,
  patchEditCategoryRequest,
} from "@/pages/api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface Props {
  category: CategoryType;
}

const RecipePage = ({ category }: Props) => {
  const [inputValue, setInputValue] = useState(category.name);

  const router = useRouter();
  const handleEdit = async () => {
    await patchEditCategoryRequest({
      id: category.id,
      name: inputValue.toString(),
    });
    router.push(`/categories/${inputValue}`);
  };

  return (
    <main className={styles.backgroundPage}>
      <Container
        style={{
          maxWidth: "800px",
          backgroundColor: "#fefefe",
        }}
      >
        <Stack spacing={2} alignItems="center" style={{ height: "100vh" }}>
          <TextField
            label="New category name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            style={{
              marginTop: "20px",
            }}
          />
          <Button
            variant="contained"
            style={{
              boxShadow: "none",
              backgroundColor: "#474d4e",
              width: "100px",
              borderRadius: "12px",
            }}
            onClick={handleEdit}
          >
            Save
          </Button>
        </Stack>
      </Container>
    </main>
  );
};

export async function getStaticPaths() {
  const data = await getCategories();
  const paths = data.map((category: CategoryType) => ({
    params: { id: category.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const id = params.id;
  const data = await getCategories();

  const category = data.find((item: CategoryType) => item.id.toString() === id);

  return {
    props: {
      category: category,
    },
  };
};

export default RecipePage;
