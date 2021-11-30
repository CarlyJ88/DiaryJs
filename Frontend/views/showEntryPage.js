import { showEntryHandler } from '../showEntries';


export default function getEntries() {
  showEntryHandler()
    .then(showEntry);
}

const createDiaryItem = (entry) => {
  const item = document.createElement('li');
  item.style.height = 'auto';
  item.className = 'diary-item';

  return item;
}

const createItemTitle = (entry) => {
  const itemTitle = document.createElement('h3');
  itemTitle.id = 'show-entry-title';
  itemTitle.innerHTML = entry.title;
  return itemTitle;
}

const createItemEntry = (entry) => {
  const itemEntry = document.createElement('p');
  itemEntry.className = 'item-entry';
  itemEntry.innerHTML = entry.entry;
  return itemEntry;
}

const createItemLinkToArticle = () => {
  const linkToArticle = document.createElement('a');
  linkToArticle.href = 'https://www.lipsum.com/';
  linkToArticle.text = 'Link to article';
  return linkToArticle;
} // temporary until markdown module is implemented

function showEntry(diaryEntries) {
  const list = document.createElement('ul');
  list.id = 'show-entries';
  
  for (let i = 0; i < diaryEntries.length; i++) {
    if (diaryEntries[i].id === 7) {
      list.append(showEntryPage(diaryEntries[i]));
  }
}
  
  body.append(list);
}

function showEntryPage(entry) {
  const item = createDiaryItem(entry);
  const itemTitle = createItemTitle(entry);
  const itemEntry = createItemEntry(entry);
  const linkToArticle = createItemLinkToArticle();
  
  item.append(itemTitle);
  item.append(itemEntry);
  item.append(linkToArticle);

  return item;
}
