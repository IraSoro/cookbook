export interface CookingTimeType {
  time: number;
  typeTime: "mins" | "hours";
}

export interface IngredientType {
  name: string;
  quantity: string;
}

export interface CommentType {
  author: string;
  comment: string;
}

export interface RecipeType {
  name: string;
  image?: string;
  tags: string[];
  username: string;
  cookingTime: CookingTimeType;
  likes: number;
  ingredients: IngredientType[];
  steps: string[];
  comments: Comment[];
}

export const EmptyRecipe: RecipeType = {
  name: "",
  image: "",
  tags: [],
  username: "",
  cookingTime: { time: 0, typeTime: "mins" },
  likes: 0,
  ingredients: [],
  steps: [],
  comments: [],
};
