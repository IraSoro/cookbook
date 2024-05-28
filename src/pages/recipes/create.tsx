import { useRouter } from "next/router";

import CreationForm from "@/components/create-form";

import { RecipeType } from "@/state/recipe-types";
import { postAdditionRequest, getRequest } from "../api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface CreationProps {
  data: RecipeType[];
}

const Creation = ({ data }: CreationProps) => {
  const router = useRouter();

  const handleAdd = async (newRecipe: RecipeType, image: File | null) => {
    if (data.length > 0) {
      newRecipe.id = data[data.length - 1].id + 1;
    } else {
      newRecipe.id = 1;
    }
    await postAdditionRequest(newRecipe, image);
    router.push("/home");
  };

  return (
    <main className={styles.backgroundPage}>
      <CreationForm hrefBack="/home" update={handleAdd} />
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

export default Creation;
