import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import CreationForm from "@/components/create-form";

import { RecipeType } from "@/state/recipe-types";
import { postAdditionRequest, getRequest } from "../api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

const Creation = () => {
  const router = useRouter();
  const [data, setData] = useState<RecipeType[]>([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/auth");
    }

    getRequest().then((res) => {
      setData(res);
    });
  }, [router]);

  const handleAdd = async (newRecipe: RecipeType, image: File | null) => {
    if (data.length > 0) {
      const max = data.reduce((acc, curr) => (acc.id > curr.id ? acc : curr));
      newRecipe.id = max.id + 1;
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

export default Creation;
