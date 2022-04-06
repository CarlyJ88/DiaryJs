import header from "../header";
import write from "../new.png";
import login from "../login.png";

import { redirect, user } from "../services/firebase";
import { navigateTo } from "../routing";

export default async function loginButtonPage(params, user) {
  const headers = header("Login", write, "/choose", "New item");
  const div = document.createElement("div");
  const container = document.createElement("img");
  container.src = login;
  container.className = "login-image";
  const button = document.createElement("a");
  button.dataset.link = true;
  button.innerHTML = "Login";
  button.className = "button";
  div.append(headers);
  div.append(container);
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
