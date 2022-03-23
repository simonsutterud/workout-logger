import {
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { UserContext } from "../../hooks/UserContext";
import fetchWorkoutsByUser from "../../utils/fetchWorkoutsByUser";
import "./MyWorkouts.css";

export default function MyWorkouts() {
  const { user, setUser } = useContext(UserContext).providerValue;

  const [workouts, setWorkouts] = useState(null);
  const [workoutsAreLoading, setWorkoutsAreLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const workoutData = await fetchWorkoutsByUser(user.username);
      setWorkouts(workoutData);
      setWorkoutsAreLoading(false);
    })();
  }, []);

  return (
    <div className="flex">
      <div className="wrapper">
        <Heading fontWeight="light">All workouts:</Heading>
        {workoutsAreLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="table-container">
            <Table variant="striped" colorScheme="blackAlpha">
              <TableCaption>
                Tip: click the workout type to go to the specific workout
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Type</Th>
                  <Th isNumeric># of sets</Th>
                  <Th isNumeric>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {workouts.data.workouts
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((workout) => {
                    return (
                      <Tr key={workout._id}>
                        <Td>
                          <Link to={`/my-workouts/${workout._id}`}>
                            {workout.type}
                          </Link>
                        </Td>
                        <Td isNumeric>{workout.sets.length}</Td>
                        <Td isNumeric>
                          {new Date(workout.date).toLocaleDateString("en-GB")}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <List>
{workouts.data.workouts.map((workout) => {
  return (
    <ListItem key={workout._id}>
      <Link to={`/my-workouts/${workout._id}`}>
        {workout.title}
      </Link>
      . Antall sett: {workout.sets.length}
    </ListItem>
  );
})}
</List> */
}
