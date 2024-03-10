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
            Welcome to &nbsp;
            <Typography component="span" variant="h1" color="primary">
              cookbook
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            A small information <br />
            Link to GitHub&nbsp;
            <Link
              href="https://github.com/IraSoro/cook-book-nextjs"
              color="primary"
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
            <Button color="primary" href="/recipes">
              Start now
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
