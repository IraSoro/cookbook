import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  IconButton,
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Input,
  FormControl,
  Select,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {
  RecipeType,
  CookingTimeType,
  IngredientType,
} from "@/state/recipe-types";
import { getCategories, getImageURL } from "@/pages/api/handlers/apiRequests";
import { CategoryType } from "@/state/category-type";

interface IngredientProps {
  ingredient: IngredientType;
  delete: () => void;
}

const Ingredient = (props: IngredientProps) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <Typography variant="body1" align="left">
          {props.ingredient.name}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body1" align="right">
          {props.ingredient.quantity}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <IconButton
          color="inherit"
          size="small"
          onClick={() => {
            props.delete();
          }}
        >
          <ClearIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

interface IngredientListProps {
  ingredients: IngredientType[];
  setIngredients: (_newIngredients: IngredientType[]) => void;
}
const IngredientList = (props: IngredientListProps) => {
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputCount, setInputCount] = useState("");

  const handleAddIngredient = () => {
    if (inputIngredient.trim() !== "" && inputCount.trim() !== "") {
      props.setIngredients([
        ...props.ingredients,
        { name: inputIngredient, quantity: inputCount },
      ]);
      setInputIngredient("");
      setInputCount("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  return (
    <Box p={2} textAlign="center" style={{ width: "100%" }}>
      <Typography variant="h5">Ingredients</Typography>
      <Box mt={3} bgcolor="#f2f2f2" borderRadius={4}>
        <Box style={{ maxWidth: "400px", margin: "0 auto" }}>
          <Grid container spacing={2}>
            {props.ingredients.map((ingredient, index) => (
              <Grid key={index} item xs={12}>
                <Ingredient
                  ingredient={ingredient}
                  delete={() => {
                    props.setIngredients(
                      props.ingredients.filter((_, i) => i !== index)
                    );
                  }}
                />
                <Divider />
                <Box mt={2} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Grid container spacing={1} alignItems="center" mt={2}>
        <Grid item xs={8}>
          <TextField
            label="Add ingredient"
            value={inputIngredient}
            onChange={(e) => setInputIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Count"
            value={inputCount}
            onChange={(e) => setInputCount(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
          />
        </Grid>
      </Grid>
      <IconButton component="span" onClick={handleAddIngredient}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

interface TagsProps {
  tags: string[];
  setTags: (_newTags: string[]) => void;
}

const Tags = (props: TagsProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() !== "" && !props.tags.includes(inputValue)) {
      props.setTags([...props.tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={9}>
        <TextField
          label="Add tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="inherit"
          fullWidth
          style={{
            boxShadow: "none",
            borderRadius: "12px",
            backgroundColor: "#e0e0e0",
          }}
          onClick={handleAddTag}
        >
          Add
        </Button>
      </Grid>
      {props.tags.map((tag, index) => (
        <Grid item key={index}>
          <Chip
            label={tag}
            onDelete={() =>
              props.setTags(props.tags.filter((_, i) => i !== index))
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

interface StepsProps {
  steps: string[];
  setSteps: (_newSteps: string[]) => void;
}

const Steps = (props: StepsProps) => {
  const [inputStep, setInputStep] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [inputEdit, setInputEdit] = useState({ index: -1, description: "" });

  const handleAddStep = () => {
    if (inputStep.trim() !== "") {
      props.setSteps([...props.steps, inputStep.trim()]);
      setInputStep("");
    }
  };

  const handleEditStep = () => {
    if (inputEdit.description.trim() !== "") {
      props.steps[inputEdit.index] = inputEdit.description;
      props.setSteps([...props.steps]);
      setInputEdit({ index: -1, description: "" });
      setOnEdit(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (onEdit) {
        handleEditStep();
      } else {
        handleAddStep();
      }
    }
  };

  return (
    <Box p={2} textAlign="center" style={{ width: "100%" }}>
      <Typography variant="h5">Cooking steps</Typography>
      <Stepper orientation="vertical">
        {props.steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography variant="body1">{step}</Typography>
              <div style={{ textAlign: "right" }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    setOnEdit(true);
                    setInputEdit({ index: index, description: step });
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    props.setSteps(props.steps.filter((_, i) => i !== index));
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </div>
              <Divider />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {onEdit ? (
        <>
          <TextField
            fullWidth
            label="Step description"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            value={inputEdit.description}
            onChange={(e) =>
              setInputEdit({
                index: inputEdit.index,
                description: e.target.value,
              })
            }
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            color="inherit"
            fullWidth
            style={{
              boxShadow: "none",
              borderRadius: "20px",
              maxWidth: "100px",
            }}
            onClick={handleEditStep}
          >
            Edit
          </Button>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            label="Step description"
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            value={inputStep}
            onChange={(e) => setInputStep(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton component="span" onClick={handleAddStep}>
            <AddIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

interface ImageProps {
  image: File | null;
  setImage: (_newImage: File | null) => void;

  editableImage: string;
}

const CreateImage = (props: ImageProps) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (props.editableImage === "") return;
    if (!isFirstRender.current) {
      return;
    } else {
      isFirstRender.current = false;
    }

    getImageURL(props.editableImage)
      .then((url) => {
        return fetch(url);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const file = new File([blob], props.editableImage, { type: blob.type });
        props.setImage(file);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [props]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files?.[0];
      props.setImage(file);
    }
  };

  return (
    <Box
      sx={{
        height: 450,
        maxWidth: 350,
        "@media (max-width: 600px)": {
          maxWidth: 290,
        },
      }}
    >
      <Input
        type="file"
        inputProps={{ accept: "image/*" }}
        style={{ display: "none" }}
        id="image-upload-input"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload-input">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            border: "solid #dedede",
            width: "100%",
            height: "100%",
            backgroundImage: props.image
              ? `url(${URL.createObjectURL(props.image)})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <IconButton component="span">
            <AddIcon />
          </IconButton>
        </Box>
      </label>
    </Box>
  );
};

interface CookingTimeProps {
  cookingTime: CookingTimeType;
  setCookingTime: (_newValue: CookingTimeType) => void;
}

const CookingTime = (props: CookingTimeProps) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <Grid container spacing={2} style={{ maxWidth: "300px" }}>
        <Grid item xs={6}>
          <TextField
            id="time-value"
            label="Cooking time"
            value={props.cookingTime.time}
            onChange={(e) =>
              props.setCookingTime({
                time: Number(e.target.value),
                typeTime: props.cookingTime.typeTime,
              })
            }
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId="time-type-label"
            id="time-type"
            value={props.cookingTime.typeTime}
            onChange={(e) =>
              props.setCookingTime({
                time: props.cookingTime.time,
                typeTime: e.target.value as "mins" | "hours",
              })
            }
          >
            <MenuItem value="mins">mins</MenuItem>
            <MenuItem value="hours">hours</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </FormControl>
  );
};

interface CategorySelectProps {
  categoryId: number;
  setCategoryId: (_newCategoryId: number) => void;
}

const CategorySelect = (props: CategorySelectProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel id="item-selector-label">Category Select</InputLabel>
      <Select
        labelId="item-selector-label"
        id="item-selector"
        value={props.categoryId ? props.categoryId.toString() : ""}
        onChange={(event) => {
          props.setCategoryId(Number(event.target.value));
        }}
        label="Select Category"
      >
        {categories.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface CreateRecipeProps {
  update: (_newRecipe: RecipeType, _image: File | null) => void;
  hrefBack: string;

  editableRecipe?: RecipeType;
}

const CreationForm = (props: CreateRecipeProps) => {
  const { query } = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [recipeName, setRecipeName] = useState(
    props.editableRecipe?.name || ""
  );
  const [cookingTime, setCookingTime] = useState<CookingTimeType>(
    props.editableRecipe?.cookingTime || {
      time: 0,
      typeTime: "mins",
    }
  );
  const [tags, setTags] = useState<string[]>(props.editableRecipe?.tags || []);
  const [ingredients, setIngredients] = useState<IngredientType[]>(
    props.editableRecipe?.ingredients || []
  );
  const [steps, setSteps] = useState<string[]>(
    props.editableRecipe?.steps || []
  );
  const [category, setCategory] = useState(
    props.editableRecipe?.categoryId || Number(query.categoryId) || 0
  );

  useEffect(() => {
    setRecipeName(props.editableRecipe?.name || "");
    setCookingTime(
      props.editableRecipe?.cookingTime || {
        time: 0,
        typeTime: "mins",
      }
    );
    setTags(props.editableRecipe?.tags || []);
    setIngredients(props.editableRecipe?.ingredients || []);
    setSteps(props.editableRecipe?.steps || []);
    setCategory(props.editableRecipe?.categoryId || 0);
  }, [props.editableRecipe]);

  const handleSaveButton = () => {
    const newRecipe: RecipeType = {
      id: props.editableRecipe?.id || 0,
      name: recipeName,
      image: props.editableRecipe?.image || "",
      tags: tags,
      username:
        props.editableRecipe?.username ||
        localStorage.getItem("username") ||
        "username",
      cookingTime: cookingTime,
      likes: props.editableRecipe?.likes || 0,
      ingredients: ingredients,
      steps: steps,
      comments: props.editableRecipe?.comments || [],
      categoryId: category || 0,
    };
    props.update(newRecipe, image);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          boxShadow: "none",
          maxWidth: "800px",
          backgroundColor: "#fefefe",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton href={props.hrefBack} size="large" color="default">
            <ArrowBackIosIcon />
          </IconButton>
          <Button
            variant="contained"
            style={{
              boxShadow: "none",
              backgroundColor: "#474d4e",
              width: "100px",
              borderRadius: "12px",
            }}
            onClick={handleSaveButton}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ maxWidth: "800px", backgroundColor: "#fefefe" }}>
        <Stack spacing={2} alignItems="center">
          {props.editableRecipe ? (
            <Typography align="center" variant="h4">
              Editing a recipe
            </Typography>
          ) : (
            <Typography align="center" variant="h4">
              Create a new recipe
            </Typography>
          )}
          <TextField
            fullWidth
            label="Recipe name"
            variant="outlined"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            margin="normal"
          />
          <CategorySelect categoryId={category} setCategoryId={setCategory} />

          <CookingTime
            cookingTime={cookingTime}
            setCookingTime={setCookingTime}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CreateImage
                image={image}
                setImage={setImage}
                editableImage={props.editableRecipe?.image || ""}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Tags tags={tags} setTags={setTags} />
            </Grid>
          </Grid>
          <IngredientList
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <Steps steps={steps} setSteps={setSteps} />
        </Stack>
      </Container>
    </>
  );
};

export default CreationForm;
