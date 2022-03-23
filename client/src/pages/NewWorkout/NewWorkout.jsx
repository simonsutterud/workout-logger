import React, { useState, useContext } from "react";
import { UserContext } from "../../hooks/UserContext";
import { Button, Container, Heading, Textarea } from "@chakra-ui/react";

import handleSuccess from "../../utils/handleSuccess";
import postWorkout from "../../utils/postWorkout";

export default function NewWorkout() {
  const { user, setUser } = useContext(UserContext).providerValue;

  const initialWorkout = `{
    "sets": [
        {
            "exercise": "Bench Press",
            "weight": "105",
            "reps": 8
        },
        {
            "exercise": "Bench Press",
            "weight": "105",
            "reps": 8
        },
        {
            "exercise": "Chin ups",
            "weight": "0",
            "reps": 8
        },
        {
            "exercise": "Chin ups",
            "weight": "0",
            "reps": 9
        }
        
    ],
    "username": "${user.username}"
}`;

  const [workout, setWorkout] = React.useState(initialWorkout);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setWorkout(inputValue);
  };

  const handleSubmitWorkout = async function () {
    const success = await postWorkout(workout);
    if (!success) {
      //
    }
    if (success) {
      handleSuccess("Workout created!");
    }
  };

  return (
    <>
      <div className="flex">
        <Container textAlign={"center"}>
          <Heading size={"lg"} mt="5">
            No front end currently implemented!
          </Heading>{" "}
          <br />
          Do, however, click the button to POST a new workout:
          <br />
          <br />
          <Textarea
            variant={"filled"}
            height="md"
            defaultValue={initialWorkout}
            onChange={handleInputChange}
          ></Textarea>
          <br />
          <br />
          <Button colorScheme={"green"} onClick={handleSubmitWorkout}>
            Create workout
          </Button>
        </Container>
      </div>
    </>
  );
}
