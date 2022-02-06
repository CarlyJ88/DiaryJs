import { showEntryHandler } from "../services/showEntries";

const categoryButton = (entry) => {
  const button = document.createElement("button");
  button.innerHTML = entry.categoryName;
  button.id = "category-button";
  let colour = `rgba(${entry.colourCode}, 0.2)`;
  // let colour = `rgba(${entry.colourCode})`;
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
  showEntryHandler().then(listCategories);
}

function listCategories(diaryEntries) {
  const list = document.createElement("ul");
  list.id = "show-entries";
  const title = categoryTitle();
  body.append(title);

  for (let i = 0; i < diaryEntries.length; i++) {
    console.log(diaryEntries[i]);
    list.append(chooseCategory(diaryEntries[i]));
  }

  body.append(list);
}

function chooseCategory(entry) {
  console.log("choose category");
  const button = categoryButton(entry);
  return button;
}
