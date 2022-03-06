import { getCategories } from "../services/service";
import header from "../header";
import { navigateTo } from "../routing";

const categoryButton = (entry) => {
  const button = document.createElement("button");
  button.innerHTML = entry.name;
  button.id = "category-button";
  button.dataset.link = true;
  let colour = `rgba(${entry.colourCode}, 0.2)`;
  button.style.backgroundColor = colour;
  button.style.border = `rgb(${entry.colourCode}) solid 3px`;
  return button;
};

const categoryTitle = () => {
  const title = document.createElement("h2");
  title.innerHTML = "Choose your category";
  title.id = "category-title";
  return title;
};

export default function getEntries() {
  header(null, "choose", null, "/new"); // not needed ?
  return getCategories().then(listCategories);
}

function listCategories(diaryEntries) {
  const div = document.createElement("div");
  const headers = header(null, "choose", null, "/new");
  const list = document.createElement("ul");
  list.id = "show-entries"; // change this
  const title = categoryTitle();
  diaryEntries.map((x) => {
    list.append(chooseCategory(x));
  });
  div.append(headers);
  div.append(title);
  div.append(list);
  return div;
}

function chooseCategory(entry) {
  const button = categoryButton(entry);
  button.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(`/new/${entry.id}`);
  });
  return button;
}
