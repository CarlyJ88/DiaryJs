import header from "../header";
import write from "../new.png";

import { redirect, user } from "../services/firebase";
import { navigateTo } from "../routing";

export default async function loginButtonPage(params, user) {
  console.log("hi log in");
  const headers = header("login", write, "/choose", "New item");
  const div = document.createElement("div");
  const button = document.createElement("button");
  button.dataset.link = true;
  button.innerHTML = "Login";
  button.className = "login-button";
  div.append(headers);
  div.append(button);
  if (user) {
    console.log(user, "user in routing");
    navigateTo(`/calendar`);
  } else {
    console.log("User is signed out in login page");
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      redirect();
    });
  }
  return div;
}
