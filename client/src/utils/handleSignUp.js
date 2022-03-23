import handleError from "./handleError";

export default async function handleSignUp(username, email, password) {
  try {
    const body = JSON.stringify({
      username,
      email,
      password,
    });

    const response = await fetch("/api/v1/users/sign-up", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    });

    if (!response.ok) throw new Error("Something went wrong");

    const userData = await response.json();

    return userData.data.user;
  } catch (error) {
    console.log(error);
    handleError(error.message);
    return false;
  }
}
