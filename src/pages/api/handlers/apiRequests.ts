import { RecipeType } from "@/state/recipe-types";
import { CategoryType } from "@/state/category-type";

export async function getRequest() {
  const getFetch = await fetch("/api/routes/recipes");
  const response = await getFetch.json();
  const data = await response.data;
  return data;
}

export async function getRecipeParamRequest(categoryId: number) {
  const getFetch = await fetch("/api/routes/recipes");
  const response = await getFetch.json();
  const data = await response.data;
  return data.filter((item: RecipeType) => item.categoryId === categoryId);
}

export async function postAdditionRequest(
  newRecipe: RecipeType,
  image: File | null
) {
  const formData = new FormData();
  if (image) {
    newRecipe.image = `${newRecipe.id}.jpg`;
    formData.append("filename", newRecipe.image);
    formData.append("image", image);
  }

  try {
    await fetch("/api/routes/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    }).then(() => {
      console.log("Recipe uploaded");
    });

    await fetch("/api/routes/images", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        console.log("Image uploaded: ");
      })
      .catch((err) => {
        console.log("Error = ", err);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteRequest(idx: number, imageName: string) {
  try {
    await fetch("/api/routes/recipes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(idx),
    }).then(() => {
      console.log(`Deleted id=${idx} element`);
    });

    if (imageName === "") {
      return;
    }

    await fetch("/api/routes/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(imageName),
    })
      .then(() => {
        console.log(`Image ${imageName} has been deleted`);
      })
      .catch((err) => {
        console.log("Error delete = ", err);
      });
  } catch (err) {
    console.log(err);
  }
}

export async function patchEditRequest(
  newRecipe: RecipeType,
  image: File | null
) {
  try {
    if (image) {
      const formData = new FormData();
      formData.append("lastFilename", newRecipe.image);
      formData.append("newFilename", `-${newRecipe.image}`);
      formData.append("image", image);

      await fetch("/api/routes/images", {
        method: "PATCH",
        body: formData,
      });
      newRecipe.image = `-${newRecipe.image}`;
      console.log("Image edited");
    }

    await fetch("/api/routes/recipes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: newRecipe }),
    });

    console.log(`Recipe id=${newRecipe.id} edited`);
  } catch (err) {
    console.error(err);
  }
}

export async function getCategories() {
  const getFetch = await fetch("/api/routes/categories");
  const response = await getFetch.json();
  const data = await response.data;
  return data;
}

export async function postAdditionCategoryRequest(newCategory: CategoryType) {
  fetch("/api/routes/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  })
    .then(() => {
      console.log("Category uploaded");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteCategoryRequest(idx: number) {
  fetch("/api/routes/categories", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(idx),
  })
    .then(() => {
      console.log(`Deleted id=${idx} category`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function patchEditCategoryRequest(editedCategory: CategoryType) {
  fetch("/api/routes/categories", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ editedCategory: editedCategory }),
  })
    .then(() => {
      console.log(`Recipe id=${editedCategory.id} changed`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getImageURL(filename: string) {
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + filename;

  fetch(imageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  return imageUrl;
}
