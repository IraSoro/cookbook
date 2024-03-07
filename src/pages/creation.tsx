import { Item } from "../components/item";
import CreationBox from "../components/create-form";

import "../app/globals.css";

const Page = () => {
  const addItem = (newItem: Item) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };
    fetch("http://localhost:3000/api/main", requestOptions)
      .then(() => {
        console.log("newItem = ", newItem);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreationBox addItem={addItem} />
    </main>
  );
};

export default Page;
