const createDiaryItem = (entry) => {
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

export default function listEntriesPage(entry, colour) {
  console.log(entry, 'entry');
  const item = createDiaryItem(entry);
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);

  item.append(itemTitle);
  item.append(itemEntry);
  return item;
}
