import handleError from "./handleError";

export default async function patchWorkout(wrkt) {
  try {
    const body = wrkt;

    const res = await fetch(`/api/v1/workouts/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    });
    const workout = await res.json();
    console.log(workout);

    if (!res.ok) throw new Error("Something went wrong. Workout not saved!");

    return workout;
  } catch (error) {
    handleError(error.message);
    return null;
  }
}
