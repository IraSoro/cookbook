import { GetStaticProps } from "next";

import { Item } from "../../components/item";
import Recipe from "../../components/recipe";
import { Button } from "@mui/material";

interface Props {
  item: Item;
}

const RecipePage: React.FC<Props> = ({ item }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Button
        color="error"
        onClick={() => {
          console.log("delete");
        }}
      >
        Delete recipe
      </Button>
      <Recipe item={item} />
    </main>
  );
};

export async function getStaticPaths() {
  const getFetch = await fetch("http://localhost:3000/api/main");
  const response = await getFetch.json();
  const data = await response.data;

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
  const getFetch = await fetch("http://localhost:3000/api/main");
  const response = await getFetch.json();
  const data = await response.data;
  const item = data.find((item: Item) => item.id.toString() === id);

  return {
    props: {
      item,
    },
  };
};

export default RecipePage;