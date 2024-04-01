import { GetStaticProps } from "next";

import { Item } from "../../../components/item";
import Editor from "../../../components/edit-form";

import { getRequest } from "@/pages/api/handlers/apiRequests";

interface Props {
  item: Item;
}

const RecipePage: React.FC<Props> = ({ item }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Editor
        editItem={(item: Item, image: null | File) => {
          console.log(item);
          console.log(image);
        }}
        item={item}
      />
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
