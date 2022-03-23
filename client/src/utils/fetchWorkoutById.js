import handleError from "./handleError";

export default async function fetchWorkoutById(id) {
  try {
    const res = await fetch(`/api/v1/workouts/user/${id}`);

    if (!res.ok) throw new Error("Something went wrong");

    const workout = await res.json();

    return workout.data.workout[0];
  } catch (error) {
    handleError(error.message);
    return null;
  }
}
