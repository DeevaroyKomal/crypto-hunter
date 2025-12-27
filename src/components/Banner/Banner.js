import { Container, Box, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url(/banner.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          pt: 3,
          justifyContent: "space-around",
        }}
      >
        {/* ✅ Use Box instead of div */}
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold", // ✅ fixed
              mb: 2,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
