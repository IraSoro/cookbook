import ItemsGrid from "../components/item";

export default async function Home() {
  const getFetch = await fetch("http://localhost:3000/api/main");
  const response = await getFetch.json();
  const data = await response.data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ItemsGrid items={data}/>
    </main>
  );
}
