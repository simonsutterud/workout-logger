import handleError from "./handleError";

export default async function deleteWorkoutById(id) {
  try {
    const res = await fetch(`/api/v1/workouts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Something went wrong. Workout not deleted!");

    return true;
  } catch (error) {
    handleError(error.message);
    return null;
  }
}
