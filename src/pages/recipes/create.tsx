import { useRouter } from "next/router";

import CreationForm from "@/components/create-form";

import { RecipeType } from "@/state/recipe-types";
import { postAdditionRequest } from "../api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

const Creation = () => {
  const router = useRouter();

  const handleAdd = async (newRecipe: RecipeType, image: File | null) => {
    await postAdditionRequest(newRecipe, image);
    router.push("/recipes");
  };

  return (
    <main className={styles.backgroundPage}>
      <CreationForm hrefBack="/recipes" update={handleAdd} />
    </main>
  );
};

export default Creation;
