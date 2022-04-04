import header from "../header";
import write from "../new.png";

import { redirect, user } from "../services/firebase";
import { navigateTo } from "../routing";

export default async function loginButtonPage(params, user) {
  const headers = header("login", write, "/choose", "New item");
  const div = document.createElement("div");
  const button = document.createElement("button");
  button.dataset.link = true;
  button.innerHTML = "Login";
  button.className = "login-button";
  div.append(headers);
  div.append(button);
  if (user) {
    navigateTo(`/calendar`);
  } else {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      redirect();
    });
  }
  return div;
}
