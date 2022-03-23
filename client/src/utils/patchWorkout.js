import handleError from "./handleError";

export default async function patchWorkout(wrkt) {
  try {
    console.log(wrkt);
    const body = JSON.stringify({
      ...wrkt,
    });

    const res = await fetch(`/api/v1/workouts/${wrkt._id}`, {
      method: "PATCH",
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
