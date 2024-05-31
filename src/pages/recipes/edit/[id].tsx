import { useEffect, useState } from "react";

import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { EmptyRecipe, RecipeType } from "@/state/recipe-types";
import CreationForm from "@/components/create-form";

import { getRequest, patchEditRequest } from "@/pages/api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface Props {
  id: string;
}

const RecipePage = ({ id }: Props) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeType>(EmptyRecipe);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/auth");
    }
    getRequest().then((res) => {
      setRecipe(res.find((recipe: RecipeType) => recipe.id.toString() === id));
    });
  }, [router, id]);
  
  const handleEdit = async (newRecipe: RecipeType, newImage: null | File) => {
    await patchEditRequest(newRecipe, newImage);
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <main className={styles.backgroundPage}>
      <CreationForm
        hrefBack={`/recipes/${recipe.id}`}
        update={handleEdit}
        editableRecipe={recipe}
      />
    </main>
  );
};

export async function getStaticPaths() {
  const data = Array.from({ length: 1000 }, (_, index) => index + 1);
  const paths = data.map((el: number) => ({
    params: { id: el.toString() },
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

  return {
    props: {
      id,
    },
  };
};

export default RecipePage;
