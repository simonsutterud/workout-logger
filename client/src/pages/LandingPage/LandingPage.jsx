import React from "react";
import { Heading, Button, Box, Spacer } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Heading className="heading" fontSize="xxx-large">
        WorkoutLogger
      </Heading>
      <div className="boxes">
        <Box
          className="box"
          boxSize="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
          borderRadius="md"
          margin="2rem"
          textAlign="center"
          boxShadow="2xl"
          outline="none"
        >
          <Heading>
            Log your <span>workouts.</span>
          </Heading>
        </Box>
        <Box
          className="box"
          boxSize="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="1rem"
          borderRadius="md"
          margin="2rem"
          textAlign="center"
        >
          <Heading>
            Gain new <span>insights.</span>
          </Heading>
        </Box>
      </div>
      <div className="bg"></div>
      <div className="skew"></div>
      <div className="skew2"></div>
      <Link to="/sign-up">
        <Button size="lg" variant="">
          SIGN UP TODAY
        </Button>
      </Link>
    </div>
  );
}
