import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box id="hero">
      <Container>
        <Stack spacing={2} useFlexGap>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Welcome to&nbsp;
            <Typography component="span" variant="h1" color="#474d4e">
              cookbook
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            My cookbook application is a convenient tool that helps you save and
            organize your favorite culinary discoveries. Explore diverse
            recipes, add your own notes, and easily find inspiration for cooking
            new dishes. Create your culinary archive with my cookbook app.
            <br />
            Link to GitHub&nbsp;
            <Link
              href="https://github.com/IraSoro/cook-book-nextjs"
              color="#474d4e"
            >
              here
            </Link>
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
          >
            <Button
              href="/recipes"
              variant="contained"
              style={{ boxShadow: "none", backgroundColor: "#474d4e" }}
            >
              Start now
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
