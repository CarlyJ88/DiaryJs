import { getEntriesByDate } from "../services/service";
import { deleteEntry } from "../services/service";
import { navigateTo } from "../routing";

import header from "../header";
import write from "../new.png";

function parseDate(date) {
  if (!date) {
    return new Date();
  }
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return new Date(year, month - 1, day || "01");
}

async function getData(dateObject, user) {
  const uid = user.uid;
  const entries = getEntriesByDate(
    `${dateObject.getFullYear()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getDate()} 00:00:00`,
    `${dateObject.getFullYear()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getDate()} 23:59:59`,
    uid
  );
  const response = await entries;
  return response;
}

async function getEntries(date, user) {
  const entries = await getData(date, user);
  const entry = entries.map((x) => {
    return listEntries(x, date);
  });
  return entry;
}

const listDate = (date1) => {
  const date = document.createElement("h1");
  date.id = "date";
  const month = date1.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  date.innerHTML = month;
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

function formatMonth(month) {
  return (month + 1).toString().padStart(2, "0");
}

function formatDay(dayy) {
  return dayy.toString().padStart(2, "0");
}

export default async function listEntriesPage({ date }, user) {
  const dateObject = parseDate(date);
  const entries = await getEntries(dateObject, user);
  const headers = header("list", write, "/choose", "New item");
  const div = document.createElement("div");
  const list = document.createElement("ul");
  list.id = "show-entries";
  const date1 = listDate(dateObject);
  div.append(headers);
  div.append(date1);
  list.append(...entries);
  div.append(list);
  return div;
}

function listEntries(entry, date) {
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
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    navigateTo(`/show/${entry.id}`);
  });

  item.append(deleteButton);
  item.append(itemTitle);
  item.append(itemEntry);
  return item;
}
