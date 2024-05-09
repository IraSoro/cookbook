import { useState } from "react";
import {
  Box,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Image from "next/image";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Item } from "./item";
import { TempItem } from "../../resources/tempItem";

interface Ingredient {
  name: string;
  quantity: string;
}

interface IngredientProps {
  ingredient: Ingredient;
}

const Ingredient = (props: IngredientProps) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <Typography variant="body1" align="left">
          {props.ingredient.name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" align="right">
          {props.ingredient.quantity}
        </Typography>
      </Grid>
    </Grid>
  );
};

interface IngredientListProps {
  ingredients: Ingredient[];
}
const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <Box
      bgcolor="#f2f2f2"
      p={2}
      borderRadius={4}
      textAlign="center"
      style={{ width: "100%" }}
    >
      <Typography variant="h4" gutterBottom>
        Ingredients
      </Typography>
      <Box mt={5} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Grid container spacing={2}>
          {ingredients.map((ingredient, index) => (
            <Grid key={index} item xs={12}>
              <Ingredient ingredient={ingredient} />
              <Divider />
              <Box mt={2} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const Tags = () => {
  return (
    <>
      <Grid item>
        <Chip
          icon={<AccessTimeIcon />}
          label={TempItem.cookingTime}
          variant="outlined"
          sx={{
            border: 2,
            borderColor: "#808080",
            fontWeight: "600",
            color: "#808080",
            marginBottom: "20px",
          }}
        />
      </Grid>
      <Grid container>
        {TempItem.tags.map((tag, index) => (
          <Chip key={index} label={tag} style={{ margin: "5px" }} />
        ))}
      </Grid>
    </>
  );
};

const Likes = () => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(TempItem.likes);
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="flex-end"
      sx={{ marginBottom: "20px" }}
    >
      <Grid item>
        <IconButton
          onClick={() => {
            if (liked) {
              setLikesCount((prevCount) => prevCount - 1);
            } else {
              setLikesCount((prevCount) => prevCount + 1);
            }
            setLiked(!liked);
          }}
          color="default"
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="body1">{likesCount}</Typography>
      </Grid>
    </Grid>
  );
};

interface StepsProps {
  steps: string[];
}

const Steps = ({ steps }: StepsProps) => {
  return (
    <Box p={2}>
      <Typography variant="h4">Let&apos;s cook</Typography>
      <Box mt={4}>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <Typography variant="body1" align="left">
                  {step}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
};

interface Comment {
  author: string;
  comment: string;
}

interface CommentsProps {
  comments: Comment[];
}

const Comments = ({ comments }: CommentsProps) => {
  return (
    <Box p={2} textAlign="left" style={{ width: "100%" }}>
      <Typography mb={4} variant="h4">
        Comments
      </Typography>
      {comments.map((comment, index) => (
        <Box key={index} p={2} bgcolor="#f2f2f2" mb={2} borderRadius={4}>
          <Box display="flex" alignItems="flex-start">
            <Avatar>{comment.author[0]}</Avatar>
            <Box ml={2}>
              <Typography variant="body1" gutterBottom>
                <strong>{comment.author}</strong>
              </Typography>
              <Typography variant="body2">{comment.comment}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

interface ItemProps {
  item: Item;
}

const Recipe = ({ item }: ItemProps) => {
  return (
    <Container>
      <Stack spacing={2} alignItems="center">
        <Typography
          color="#474d4e"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "4rem",
            "@media (max-width: 600px)": {
              fontSize: "3rem",
            },
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Typography>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar sx={{ width: 32, height: 32, marginRight: "10px" }} />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {TempItem.username}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {item.image && (
              <Box
                sx={{
                  height: 450,
                  maxWidth: 350,
                  "@media (max-width: 600px)": {
                    maxWidth: 290,
                  },
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  height={0}
                  width={0}
                  src={`/data/${item.image}`}
                  alt={item.name}
                  loading="lazy"
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Likes />
            <Tags />
          </Grid>
        </Grid>
        <IngredientList ingredients={TempItem.ingredients} />
        <Steps steps={TempItem.steps} />
        <Comments comments={TempItem.comments} />
      </Stack>
    </Container>
  );
};

export default Recipe;
