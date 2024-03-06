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

interface PropsItem {
  item: Item;
  idx: number;
  deleteItem: (_idx: number) => void;
}

const Item = (props: PropsItem) => {
  return (
    <Card className={styles.cardItem}>
      <CardHeader title={props.item.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => {
            props.deleteItem(props.idx);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

interface PropsItems {
  items: Item[];
  deleteItem: (_idx: number) => void;
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
            <Item item={item} idx={idx} deleteItem={props.deleteItem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsGrid;
