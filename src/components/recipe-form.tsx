import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { Item } from "./item";

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
        <Typography variant="body1" textAlign="center" color="text.secondary">
          {item.description}
        </Typography>
      </Stack>
    </Container>
  );
};

export default Recipe;
