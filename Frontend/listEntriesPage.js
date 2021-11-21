const createDiaryItem = (entry) => {
  const item = document.createElement('li');
  item.className = 'diary-item';

  if (entry.category === 'CSS') { // to-do: use a class instead
    item.style.backgroundColor = 'rgba(149, 16, 172, 0.2)';
    item.style.border = '#9510AC solid 3px';
    
  }
  else if (entry.category === 'Clean Code') {
    item.style.backgroundColor = 'rgba(65, 75, 178, 0.2)';
    item.style.border = '#414BB2 solid 3px';
  }
  else if (entry.category === 'Design Patterns') {
    item.style.backgroundColor = 'rgba(242, 71, 38, 0.2)';
    item.style.border = '#F24726 solid 3px';
  }

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

export default function listEntriesPage(entry) {
  const item = createDiaryItem(entry);
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);

  item.append(itemTitle);
  item.append(itemEntry);
  return item;
}
