import { showEntryHandler } from '../showEntries';


export default function getEntries() {
  showEntryHandler()
    .then(listEntries);
}

const listDate = () => {
  const date = document.createElement('h1');
  date.id = 'date'
  return date;
}

const createDiaryItem = (entry) => {
  console.log(entry, 'entry')
  const item = document.createElement('li');
  let colour = `rgba(${entry.colourCode}, 0.2)`;
  item.className = 'diary-item';
  item.style.backgroundColor = colour;
  item.style.border = `rgb(${entry.colourCode}) solid 3px`;

  return item;
}

const createItemTitle = (entry) => {
  const itemTitle = document.createElement('h3');
  itemTitle.innerHTML = entry.title;
  return itemTitle;
}

const createItemEntry = (entry) => {
  const itemEntry = document.createElement('p');
  itemEntry.className = 'item-entry';
  itemEntry.innerHTML = entry.entry;
  return itemEntry;
}

function listEntries(diaryEntries) {
  const list = document.createElement('ul');
  list.id = 'show-entries';
  const date = listDate();
  body.append(date);
  
  for (let i = 0; i < diaryEntries.length; i++) {
    const fixDate = new Date(diaryEntries[i].date) // Fri Nov 19 2021 19:18:19 GMT+0000 (Greenwich Mean Time)
    const month = fixDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    date.innerHTML = month;
    list.append(listEntriesPage(diaryEntries[i]));
    console.log(diaryEntries[i], 'diaryEntries[i]');
  }
  
  body.append(list);
}

function listEntriesPage(entry) {
  console.log(entry, 'entry');
  const item = createDiaryItem(entry);
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);

  item.append(itemTitle);
  item.append(itemEntry);
  return item;
}
