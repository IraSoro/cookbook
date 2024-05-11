// import { Item } from "@/components/item";
import { RecipeType } from "@/state/recipe-types";

export async function getRequest() {
  const getFetch = await fetch("http://localhost:3000/api/routes");
  const response = await getFetch.json();
  const data = await response.data;
  return data;
}

export async function postAdditionRequest(
  newRecipe: RecipeType,
  image: File | null
) {
  // TODO: delete and rewrite this
  const recipes = await getRequest();
  const id = recipes[0].id + 1;
  newRecipe.id = id;

  const formData = new FormData();
  if (image) {
    newRecipe.image = `${id}.jpg`;
    formData.append("filename", newRecipe.image);
    formData.append("image", image);
  }

  fetch("http://localhost:3000/api/images", {
    method: "POST",
    body: formData,
  })
    .then(() => {
      console.log("Image uploaded");
    })
    .catch((err) => {
      console.log(err);
    });

  fetch("http://localhost:3000/api/routes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRecipe),
  })
    .then(() => {
      console.log("Recipe uploaded");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteRequest(idx: number, imageName: string) {
  fetch("http://localhost:3000/api/images", {
    method: "DELETE",
    body: JSON.stringify(imageName),
  })
    .then(() => {
      console.log("Image deleted");
    })
    .catch((err) => {
      console.log(err);
    });

  fetch("http://localhost:3000/api/routes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idx),
  })
    .then(() => {
      console.log(`Deleted id=${idx} element`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function patchEditRequest(newItem: Item, image: File | null) {
  const formData = new FormData();
  if (image) {
    newItem.image = `${newItem.id}.jpg`;
    formData.append("filename", newItem.image);
    formData.append("image", image);
  }

  fetch("http://localhost:3000/api/images", {
    method: "PATCH",
    body: formData,
  })
    .then(() => {
      console.log("Image edited");
    })
    .catch((err) => {
      console.log(err);
    });

  fetch("http://localhost:3000/api/routes", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ item: newItem }),
  })
    .then(() => {
      console.log(`Item id=${newItem.id} edited`);
    })
    .catch((err) => {
      console.log(err);
    });
}
