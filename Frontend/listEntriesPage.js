import {
  deleteEntryHandler
} from './deleteEntries';
import {
  editEntryHandler
} from './editEntries';
import createEntryPopup from './createEntryPopup'; // add all listed entries in a div and add a margin-top

export default function listEntriesPage(entry, list) {
  // console.log('am i in list entries page?')
  const newdiv = document.createElement('div');
  newdiv.id = 'input-div';
  let deleteButton = document.createElement('button');
  let editButton = document.createElement('button');

  const date = new Date(entry.date);
  // const edited = new Date(entry.edited);
  
  const item = document.createElement('li');
  item.className = 'diary-item';
  const itemDate = document.createElement('p');
  itemDate.className = 'item-date';
  itemDate.innerHTML = date.toLocaleDateString().split('T')[0];
  const itemEntry = document.createElement('p');
  itemEntry.className = 'item-entry';
  itemEntry.innerHTML = entry.title;

  item.append(itemDate);
  item.append(itemEntry);
  list.append(item);
  body.append(list);



  deleteEntryHandler(entry.id, newdiv, deleteButton);

  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    const form = createEntryPopup();
    editEntryHandler(form, entry, newdiv);
  })
  // return newdiv;
}
