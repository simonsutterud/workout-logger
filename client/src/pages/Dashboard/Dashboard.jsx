import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { UserContext } from "../../hooks/UserContext";
import fetchWorkouts from "../../utils/fetchWorkoutsByUser";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext).providerValue;
  const [workouts, setWorkouts] = useState(null);
  const [latestWorkout, setLatestWorkout] = useState(null);
  const [workoutsAreLoading, setWorkoutsAreLoading] = useState(false);

  const username = user.username;

  useEffect(() => {
    setWorkoutsAreLoading(true);

    (async function fetchData() {
      const data = await fetchWorkouts(username);
      setWorkouts(data);
      data.results > 0
        ? setLatestWorkout(
            data.data.workouts.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )[0]
          )
        : setLatestWorkout({
            title: "No workouts yet.",
            sets: ["Start by registering a new workout!"],
          });
      setWorkoutsAreLoading(false);
    })();
  }, []);

  return (
    <div className="flex">
      {workoutsAreLoading || !workouts || !latestWorkout ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="wrapper">
            <div className="header-section">
              <Heading
                marginBottom="5"
                fontWeight="200"
                fontSize="xxx-large"
                className="greeting"
              >
                Welcome{workouts.results > 0 ? " back" : ""},{" "}
                <span>{username}</span>.
              </Heading>
              <Text
                fontSize="xl"
                fontWeight="medium"
                paddingLeft="1"
                textAlign="center"
              >
                Your latest workout:
              </Text>
            </div>
            <div className="workout-section">
              <Box
                bgColor="white"
                borderRadius="3xl"
                boxSize="sm"
                boxShadow="lg"
                overflow="hidden"
              >
                <Container
                  overflow="auto"
                  width="inherit"
                  p="0"
                  height="inherit"
                >
                  <Heading
                    size="md"
                    mb="3"
                    textDecor="underline"
                    className="latest-workout-title"
                    p="4"
                    paddingX="6"
                    paddingTop="5"
                    position="fixed"
                    width="inherit"
                    borderTopRadius="3xl"
                  >
                    {workouts.results > 0 ? (
                      <Link to={`/my-workouts/${latestWorkout._id}`}>
                        {latestWorkout.title}
                      </Link>
                    ) : (
                      <div>{latestWorkout.title}</div>
                    )}
                  </Heading>
                  <List p="6" paddingTop="0.5" mt="65px" overflow="scroll">
                    {workouts.results > 0 ? (
                      latestWorkout.sets.map((set) => {
                        return (
                          <ListItem marginY="2" fontSize="sm" key={set._id}>
                            {set.exercise}: {set.weight}kg x {set.reps} reps
                          </ListItem>
                        );
                      })
                    ) : (
                      <ListItem>
                        Start by registering a{" "}
                        <Link to="/new-workout">new workout</Link>!
                      </ListItem>
                    )}
                  </List>
                </Container>
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* <List>
                  {workouts.data.workouts.map((workout) => {
                    return (
                      <ListItem key={workout._id}>{workout.title}</ListItem>
                    );
                  })}
                </List> */
