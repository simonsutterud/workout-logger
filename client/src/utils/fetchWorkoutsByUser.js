import handleError from "./handleError";

export default async function fetchWorkoutsByUser(username) {
  try {
    const res = await fetch(`/api/v1/workouts/${username}`);

    if (!res.ok) throw new Error("Something went wrong");

    const workouts = await res.json();

    return workouts;
  } catch (error) {
    handleError(error.message);
    return null;
  }
}
