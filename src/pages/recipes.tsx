import ItemsGrid from "../components/item";
import { Item } from "../components/item";

interface PageProps {
  data: Item[];
}

const Page = (props: PageProps) => {
  return <ItemsGrid items={props.data}></ItemsGrid>;
};

export async function getStaticProps() {
  const getFetch = await fetch("http://localhost:3000/api/main");
  const response = await getFetch.json();
  const data = await response.data;

  if (!data){
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data: data,
    },
  };
}

export default Page;
