import { Box } from "@mui/material";
import { GetStaticProps } from "next";

interface Props {
  id: string;
}

const Post: React.FC<Props> = ({ id }) => {
  return <Box>{id}</Box>;
};

export async function getStaticPaths() {
  const recipeIds = [0, 1, 2];

  const paths = recipeIds.map((id) => ({
    params: { id: id.toString() },
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

export default Post;
