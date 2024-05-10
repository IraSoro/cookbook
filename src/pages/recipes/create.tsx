import { useRouter } from "next/router";

import CreationForm from "@/components/create-form";

import { RecipeType } from "@/state/recipe-types";

import styles from "@/styles/utils.module.css";

const Creation = () => {
  const router = useRouter();

  const handleAdd = async (newRecipe: RecipeType) => {
    router.push("/recipes");
    // postAdditionRequest(newItem, image, update);
  };

  return (
    <main className={styles.backgroundPage}>
      <CreationForm hrefBack="/recipes" addRecipe={handleAdd} />
    </main>
  );
};

export default Creation;
