import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { RecipeType } from "@/state/recipe-types";
import CreationForm from "@/components/create-form";

import { getRequest, patchEditRequest } from "@/pages/api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface Props {
  recipe: RecipeType;
}

const RecipePage = ({ recipe }: Props) => {
  const router = useRouter();
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
  const data = await getRequest();

  const paths = data.map((recipe: RecipeType) => ({
    params: { id: recipe.id.toString() },
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
  const data = await getRequest();
  const recipe = data.find((item: RecipeType) => item.id.toString() === id);

  return {
    props: {
      recipe,
    },
  };
};

export default RecipePage;
