export async function getRequest() {
  const getFetch = await fetch("http://localhost:3000/api/routes");
  const response = await getFetch.json();
  const data = await response.data;
  return data;
}
