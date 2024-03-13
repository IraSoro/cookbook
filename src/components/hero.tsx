import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Container style={{ marginTop: "5%" }}>
      <Stack spacing={2} alignItems="center">
        <Typography
          component="h1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignSelf: "center",
            textAlign: "center",
            fontSize: "5rem",
            "@media (max-width: 600px)": {
              fontSize: "3rem",
            },
            fontWeight: "bold",
          }}
        >
          Welcome to&nbsp;
          <Typography
            component="span"
            color="#474d4e"
            sx={{
              fontSize: "5rem",
              "@media (max-width: 600px)": {
                fontSize: "3rem",
              },
              fontWeight: "bold",
            }}
          >
            cookbook
          </Typography>
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary">
          My cookbook application is a convenient tool that helps you save and
          organize your favorite culinary discoveries. Explore diverse recipes,
          add your own notes, and easily find inspiration for cooking new
          dishes. Create your culinary archive with my cookbook app.
          <br />
          Link to GitHub&nbsp;
          <Link
            href="https://github.com/IraSoro/cook-book-nextjs"
            color="#474d4e"
          >
            here
          </Link>
        </Typography>
        <Button
          href="/recipes"
          variant="contained"
          style={{
            boxShadow: "none",
            backgroundColor: "#474d4e",
            width: "150px",
            borderRadius: "12px",
          }}
        >
          Start now
        </Button>
      </Stack>
    </Container>
  );
}
