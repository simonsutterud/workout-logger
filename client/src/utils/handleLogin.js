import handleError from "./handleError";

export default async function handleLogin(username, password) {
  try {
    const body = JSON.stringify({
      username,
      password,
    });

    const res = await fetch("/api/v1/users/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    });

    if (!res.ok) throw new Error("Incorrect username or password");

    const userData = await res.json();
    return userData.data.user;
  } catch (error) {
    handleError(error.message);
    return null;
  }
}
