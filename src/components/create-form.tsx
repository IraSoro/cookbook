import { ChangeEvent, useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import { Item } from "./item";
import { TempItem } from "../../resources/tempItem";

interface Ingredient {
  name: string;
  quantity: string;
}

interface IngredientProps {
  ingredient: Ingredient;
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
  ingredients: Ingredient[];
  setIngredients: (_newIngredients: Ingredient[]) => void;
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
      <Typography variant="h5" gutterBottom>
        Ingredients
      </Typography>
      <Grid container spacing={1} alignItems="center">
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
      <Box mt={2} bgcolor="#f2f2f2" borderRadius={4}>
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
          style={{ boxShadow: "none", borderRadius: "20px" }}
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
    </Box>
  );
};

interface ImageProps {
  image: File | null;
  setImage: (_newImage: File | null) => void;
}

const CreateImage = (props: ImageProps) => {
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
  valueTime: string;
  setValueTime: (_newValue: string) => void;

  timeType: string;
  setTimeType: (_newType: string) => void;
}

const CookingTime = (props: CookingTimeProps) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <Grid container spacing={2} style={{ maxWidth: "300px" }}>
        <Grid item xs={6}>
          <TextField
            id="time-value"
            label="Cooking time"
            value={props.valueTime}
            onChange={(e) => props.setValueTime(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId="time-type-label"
            id="time-type"
            value={props.timeType}
            onChange={(e) => props.setTimeType(e.target.value as string)}
          >
            <MenuItem value="mins">mins</MenuItem>
            <MenuItem value="hours">hours</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </FormControl>
  );
};

const CreationForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [recipeName, setRecipeName] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [timeType, setTimeType] = useState("mins");
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  return (
    <Container>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">Create a new recipe</Typography>
        <TextField
          fullWidth
          label="Recipe name"
          variant="outlined"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          margin="normal"
        />
        <CookingTime
          valueTime={cookingTime}
          setValueTime={setCookingTime}
          timeType={timeType}
          setTimeType={setTimeType}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CreateImage image={image} setImage={setImage} />
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
  );
};

export default CreationForm;
