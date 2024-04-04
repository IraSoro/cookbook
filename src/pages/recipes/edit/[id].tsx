import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Item } from "@/components/item";
import Editor from "@/components/edit-form";

import { getRequest, patchEditRequest } from "@/pages/api/handlers/apiRequests";

import "@/app/globals.css";
import styles from "@/styles/utils.module.css";

interface Props {
  item: Item;
}

const RecipePage: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const handleEdit = async (newItem: Item, newImage: null | File) => {
    await patchEditRequest(newItem, newImage);
    router.push(`/recipes/${item.id}`);
  };

  return (
    <main className={styles.backgroundPage}>
      <Editor editItem={handleEdit} item={item} />
    </main>
  );
};

export async function getStaticPaths() {
  const data = await getRequest();

  const paths = data.map((item: Item) => ({
    params: { id: item.id.toString() },
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
  const item = data.find((item: Item) => item.id.toString() === id);

  return {
    props: {
      item,
    },
  };
};

export default RecipePage;
