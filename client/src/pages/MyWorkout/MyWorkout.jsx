import {
  ArrowLeftIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import deleteWorkoutById from "../../utils/deleteWorkoutById";
import fetchWorkoutById from "../../utils/fetchWorkoutById";
import handleSuccess from "../../utils/handleSuccess";
import patchWorkout from "../../utils/patchWorkout";
import "./MyWorkout.css";

// This component is currently extremely messy!
// Have to come back and refactor later.

export default function MyWorkouts() {
  const { id } = useParams();

  const [workout, setWorkout] = useState(null);
  const [workoutIsLoading, setWorkoutIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  useEffect(() => {
    (async function () {
      const workoutData = await fetchWorkoutById(id);
      setWorkout(workoutData);
      setWorkoutIsLoading(false);
    })();
  }, []);

  const handleAcceptEdit = function () {
    setIsEditable(false);
    const newWorkout = getTableValues();
    if (isEqual(workout.sets, newWorkout.sets)) return;

    (async () => {
      const success = await patchWorkout(newWorkout);
      if (!success) {
        handleDiscardEdit();
      }
      if (success) {
        newWorkout.date = workout.date;
        newWorkout.title = workout.title;
        newWorkout.type = workout.type;
        newWorkout.username = workout.username;
        newWorkout.__v = workout.__v;
        setShowOriginal(false);
        setWorkout(newWorkout);
        handleSuccess("Changes saved!");
      }
    })();
  };
  const handleDiscardEdit = function () {
    setIsEditable(false);
    const newWorkout = getTableValues();
    if (isEqual(workout.sets, newWorkout.sets)) return;
    setShowOriginal(false);
    console.log("her skjer dette");
    document.querySelector(
      ".table-title"
    ).innerHTML = `<span tabindex="0" class="chakra-editable__preview css-1fhyjwj">${
      workout.title
    }</span><input hidden=${!isEditable} class="chakra-editable__input css-higcjm" value="${
      workout.title
    }">`;

    setTimeout(() => {
      setShowOriginal(true);
    }, 20);
  };

  const openModal = function () {
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Workout
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDeleteWorkout} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

  const handleDeleteRow = function (event) {
    const row =
      event.target.parentElement.localName === "td"
        ? event.target.parentElement
        : event.target.parentElement.parentElement;

    console.log(row.parentElement.dataset.rownumber);

    row.parentElement.remove();
  };

  const handleDeleteWorkout = async function () {
    setIsOpen(false);
    const isDeleted = await deleteWorkoutById(workout._id);
    if (isDeleted) {
      handleSuccess("Workout successfully deleted!");
      navigate("/my-workouts");
    }
  };

  const getTableValues = function () {
    const newWorkout = {
      title: document.querySelector(".table-title").innerText,
      sets: [],
      _id: id,
    };

    const table = document.querySelector(".workout-table");
    for (let r = 1, n = table.rows.length; r < n; r++) {
      let exercise, weight, reps;
      for (let c = 0, m = table.rows[r].cells.length; c < m; c++) {
        if (c === 0) {
          // EXERCISE
          exercise = table.rows[r].cells[c].innerText;
        }

        if (c === 1) {
          // WEIGHT
          weight = table.rows[r].cells[c].innerText;
        }

        if (c === 2) {
          // REPS
          reps = table.rows[r].cells[c].innerText;
        }
      }
      newWorkout.sets.push({
        exercise,
        weight: Number(weight),
        reps: Number(reps),
        _id: workout.sets[r - 1]._id,
      });
    }
    return newWorkout;
  };

  function EditableControls() {
    return !isEditable ? (
      <>
        <Button
          className="new-workout"
          leftIcon={<EditIcon />}
          onClick={() => setIsEditable(!isEditable)}
          mr="2"
        >
          Edit
        </Button>
        <Button
          color="red.400"
          bgColor="#2d3439"
          _hover={{ bgColor: "red.400", color: "#000000" }}
          _active={{ bgColor: "red.600", color: "#000000" }}
          leftIcon={<DeleteIcon />}
          onClick={() => setIsOpen(true)}
        >
          Delete
        </Button>
      </>
    ) : (
      <ButtonGroup>
        <IconButton
          colorScheme="green"
          icon={<CheckIcon />}
          onClick={handleAcceptEdit}
        ></IconButton>
        <IconButton
          colorScheme="red"
          icon={<CloseIcon />}
          onClick={handleDiscardEdit}
        ></IconButton>
      </ButtonGroup>
    );
  }

  const renderSets = function (wrkt, reRender = false) {
    if (reRender) {
      wrkt = getTableValues();
    }
    console.log(wrkt);
    return wrkt.sets.map((set, i) => {
      return (
        <Tr key={set._id} data-rownumber={i}>
          <Td>
            <Editable
              isDisabled={!isEditable}
              bgColor={!isEditable ? "" : "white"}
              borderRadius="5"
              p="1"
              paddingRight="2"
              w="fit-content"
              maxW="210px"
              defaultValue={set.exercise}
              isTruncated
            >
              <EditablePreview cursor="text" />
              <EditableInput cursor="text" />
            </Editable>
          </Td>
          <Td>
            <Editable
              isDisabled={!isEditable}
              bgColor={!isEditable ? "" : "white"}
              borderRadius="5"
              p="1"
              paddingRight="3"
              w="fit-content"
              defaultValue={`${set.weight}`}
            >
              <EditablePreview cursor="text" />
              <EditableInput cursor="text" />
            </Editable>
          </Td>
          <Td display="flex" alignItems="center" justifyContent="space-between">
            <Editable
              isDisabled={!isEditable}
              bgColor={!isEditable ? "" : "white"}
              borderRadius="5"
              p="1"
              paddingRight="3"
              w="fit-content"
              defaultValue={`${set.reps}`}
            >
              <EditablePreview cursor="text" />
              <EditableInput cursor="text" />
            </Editable>
            {isEditable && (
              <IconButton
                icon={<MinusIcon />}
                size="sm"
                colorScheme="red"
                data-rownumber={i}
                onClick={handleDeleteRow}
              />
            )}
          </Td>
        </Tr>
      );
    });
  };

  if (id)
    return (
      <div className="flex">
        {openModal()}
        {workout ? (
          <div>
            <Heading
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb="10"
            >
              <Editable
                isDisabled={!isEditable}
                bgColor={!isEditable ? "" : "white"}
                borderRadius="5"
                p="1"
                paddingRight="3"
                w="fit-content"
                defaultValue={workout.title}
                className="table-title"
              >
                <EditablePreview cursor="text" />
                <EditableInput cursor="text" />
              </Editable>
            </Heading>
            <Flex justifyContent="space-between" pr="4">
              <Link to="/my-workouts">
                <Button
                  className="back-btn"
                  ml="4"
                  leftIcon={<ArrowLeftIcon />}
                >
                  Back
                </Button>
              </Link>
              <Editable>
                <EditableControls />
              </Editable>
            </Flex>

            <div className="table-container">
              <Table
                variant="striped"
                colorScheme="blackAlpha"
                className="workout-table"
                size="sm"
              >
                <Thead>
                  <Tr>
                    <Th width="33%">Exercise</Th>
                    <Th width="33%">Weight in kg</Th>
                    <Th width="33%"># of reps</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {showOriginal ? renderSets(workout) : renderSets("", true)}
                </Tbody>
              </Table>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );

  if (id && !workoutIsLoading && !workout);
  return (
    <div className="flex">
      <Heading>No workout with that ID exists!</Heading>
    </div>
  );
}
