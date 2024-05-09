import { AppBar, Container, IconButton, Toolbar } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import CreationForm from "@/components/create-form";

import styles from "@/styles/utils.module.css";

const Creation = () => {
  return (
    <main className={styles.backgroundPage}>
      <AppBar
        position="static"
        style={{
          boxShadow: "none",
          maxWidth: "800px",
          backgroundColor: "#fefefe",
        }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton href="/recipes" size="large" color="default">
            <ArrowBackIosIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container
        style={{
          maxWidth: "800px",
          backgroundColor: "#fefefe",
        }}
      >
        <CreationForm />
      </Container>
    </main>
  );
};

export default Creation;
