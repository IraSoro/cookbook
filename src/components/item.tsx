import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./item.module.css";

export interface Item {
  name: string;
  description: string;
}

const Item = (props: Item) => {
  return (
    <Card className={styles.cardItem}>
      <CardHeader title={props.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

interface PropsItems {
  items: Item[];
}

const ItemsGrid = (props: PropsItems) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(props.items).map((item, idx) => (
          <Grid item xs={12} sm={4} md={4} key={idx}>
            <Item name={item.name} description={item.description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsGrid;
