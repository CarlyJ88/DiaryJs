import { getEntriesByDate } from "../services/service";
import { deleteEntry } from "../services/service";
import { navigateTo } from "../routing";

import header from "../header";

function parseDate(date) {
  if (!date) {
    return new Date();
  }
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return new Date(year, month - 1, day || "01");
}

export default function getEntries({ date }) {
  const dateObject = parseDate(date);
  return getEntriesByDate(
    `${dateObject.getFullYear()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getDate()} 00:00:00`,
    `${dateObject.getFullYear()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getDate()} 23:59:59`
  ).then(listEntries);
}

const listDate = () => {
  const date = document.createElement("h1");
  date.id = "date";
  return date;
};

const createDiaryItem = (entry) => {
  const item = document.createElement("li");
  item.dataset.link = true;
  let colour = `rgba(${entry.colourCode}, 0.2)`;
  item.className = "diary-item";
  item.style.backgroundColor = colour;
  item.style.border = `rgb(${entry.colourCode}) solid 3px`;
  return item;
};

const createItemTitle = (entry) => {
  const itemTitle = document.createElement("h3");
  itemTitle.innerHTML = entry.title;
  return itemTitle;
};

const createItemEntry = (entry) => {
  const itemEntry = document.createElement("p");
  itemEntry.className = "item-entry";
  itemEntry.innerHTML = entry.entry;
  return itemEntry;
};

const deleteEntryButton = () => {
  const button = document.createElement("button");
  button.className = "delete-entry-button";
  button.innerHTML = "x";
  return button;
};

function listEntries(diaryEntries) {
  const headers = header(null, "list", null, "/choose");
  const div = document.createElement("div");
  const list = document.createElement("ul");
  list.id = "show-entries";
  const date = listDate();

  //
  for (let i = 0; i < diaryEntries.length; i++) {
    const fixDate = new Date(diaryEntries[i].date); // Fri Nov 19 2021 19:18:19 GMT+0000 (Greenwich Mean Time)
    const month = fixDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    date.innerHTML = month;
    list.append(listEntriesPage(diaryEntries[i]));
  }
  //

  div.append(headers);
  div.append(date);
  div.append(list);
  return div;
}

function listEntriesPage(entry) {
  const item = createDiaryItem(entry);
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);
  const deleteButton = deleteEntryButton();

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteEntry(entry.id).catch(function (error) {
      console.log(error);
    });
    event.target.parentElement.remove();
  });

  item.addEventListener("click", (event) => {
    event.preventDefault();
    navigateTo(`/show/${entry.id}`);
  });

  item.append(deleteButton);
  item.append(itemTitle);
  item.append(itemEntry);
  return item;
}
