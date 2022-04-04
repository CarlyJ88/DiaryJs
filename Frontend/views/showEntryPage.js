import { getEntriesByDate } from "../services/service";
import header from "../header";
import write from "../new.png";

var showdown = require("showdown"),
  converter = new showdown.Converter({ metadata: true }),
  text =
    "# this is a title \n * bulletpoint 1 \n * bulletpoint 2 \n* bulletpoint 3",
  html = converter.makeHtml(text);

function parseDate(date) {
  if (!date) {
    return new Date();
  }
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  return new Date(year, month - 1, day || "01");
}
// create a service + endpoint to query table by user id and uid
export default function showEntryPage({ id, date }, user) {
  const dateObject = parseDate(date);
  return getEntriesByDate(
    `${dateObject.getFullYear()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getDate()} 00:00:00`,
    `${dateObject.getFullYear()}-${
      dateObject.getMonth() + 1
    }-${dateObject.getDate()} 23:59:59`,
    user.uid
  ).then((diaryEntries) => showEntry(diaryEntries, id));
}

const createDiaryItem = () => {
  const item = document.createElement("li");
  item.className = "show-item";
  return item;
};

const createItemTitle = (entry) => {
  const itemTitle = document.createElement("h3");
  itemTitle.id = "show-entry-title";
  itemTitle.innerHTML = entry.title;
  return itemTitle;
};

const createItemEntry = (entry) => {
  const itemEntry = document.createElement("p");
  itemEntry.className = "show-item-entry";
  html = converter.makeHtml(entry.entry);
  itemEntry.innerHTML = html;
  return itemEntry;
};

const createItemLinkToArticle = (entry) => {
  const linkToArticle = document.createElement("a");
  linkToArticle.href = entry.link;
  linkToArticle.text = "Link to article";
  return linkToArticle;
}; // temporary until markdown module is implemented

function showEntry(diaryEntries, entryId) {
  const show = document.createElement("div");
  show.id = "show-entry";

  for (let i = 0; i < diaryEntries.length; i++) {
    if (diaryEntries[i].id === Number(entryId)) {
      show.append(createEntryPage(diaryEntries[i]));
    }
  }
  return show;
}

function createEntryPage(entry) {
  const div = document.createElement("div");
  div.className = "show-entry-page";
  const headers = header("show", write, `/edit/${entry.id}`, "Edit item");
  const item = createDiaryItem();
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);
  const linkToArticle = createItemLinkToArticle(entry);

  item.append(itemTitle);
  item.append(itemEntry);
  item.append(linkToArticle);
  div.append(headers);
  div.append(item);
  return div;
}
