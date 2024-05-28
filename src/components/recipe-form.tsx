import { useEffect, useState } from "react";
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
  Button,
  TextField,
} from "@mui/material";
import Image from "next/image";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  RecipeType,
  IngredientType,
  CommentType,
  CookingTimeType,
} from "@/state/recipe-types";
import { getImageURL } from "@/pages/api/handlers/apiRequests";

interface IngredientProps {
  ingredient: IngredientType;
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
  ingredients: IngredientType[];
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

interface TagsProps {
  cookingTime: CookingTimeType;
  tags: string[];
}

const Tags = (props: TagsProps) => {
  return (
    <>
      <Grid item>
        <Chip
          icon={<AccessTimeIcon />}
          label={`${props.cookingTime.time} ${props.cookingTime.typeTime}`}
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
        {props.tags.map((tag, index) => (
          <Chip key={index} label={tag} style={{ margin: "5px" }} />
        ))}
      </Grid>
    </>
  );
};

interface LikesProps {
  likes: number;
}

const Likes = (props: LikesProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(props.likes);
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
    <Box p={2} style={{ width: "100%" }}>
      <Typography variant="h4" mb={4}>
        Let&apos;s cook
      </Typography>
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
  );
};

interface CommentsProps {
  comments: CommentType[];
  username: string;
}

const Comments = (props: CommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(props.comments);

  const handleSubmit = () => {
    comments.push({ author: props.username, comment: newComment });
    setComments([...comments]);
    setNewComment("");
  };

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
      {true && (
        <Box p={2} bgcolor="#f2f2f2" mb={2} borderRadius={4} textAlign="right">
          <TextField
            fullWidth
            label="Your Comment"
            variant="outlined"
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            style={{
              boxShadow: "none",
              backgroundColor: "#474d4e",
              width: "150px",
              borderRadius: "12px",
            }}
            onClick={handleSubmit}
          >
            Add comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

interface ItemProps {
  recipe: RecipeType;
}

const Recipe = ({ recipe }: ItemProps) => {
  const defaultImage = "/default.jpg";
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    getImageURL(recipe.image)
      .then((res) => {
        setImage(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
          {recipe.name}
        </Typography>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar sx={{ width: 32, height: 32, marginRight: "10px" }} />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {recipe.username}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {recipe.image && (
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
                  src={image}
                  alt={recipe.name}
                  loading="lazy"
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Likes likes={recipe.likes} />
            <Tags cookingTime={recipe.cookingTime} tags={recipe.tags} />
          </Grid>
        </Grid>
        <IngredientList ingredients={recipe.ingredients} />
        <Steps steps={recipe.steps} />
        <Comments comments={recipe.comments} username={recipe.username} />
      </Stack>
    </Container>
  );
};

export default Recipe;
