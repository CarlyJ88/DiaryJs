import {
  deleteEntryHandler
} from './deleteEntries';
import {
  editEntryHandler
} from './editEntries';
import createEntryPopup from './createEntryPopup';

export default function createEntryDisplay(entry) {
  const newdiv = document.createElement('div');
  newdiv.id = 'input-div';
  let deleteButton = document.createElement('button');
  let editButton = document.createElement('button');

  combineEntry(newdiv, deleteButton, editButton, entry);

  body.append(newdiv);

  deleteEntryHandler(entry.id, newdiv, deleteButton);

  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    const form = createEntryPopup();
    editEntryHandler(form, entry, newdiv);
  })
  return newdiv;
}

function combineEntry(newdiv, deleteButton, editButton, diaryEntries) {
  const date = new Date(diaryEntries.date);
  const edited = new Date(diaryEntries.edited);
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', date.toLocaleDateString(), newdiv);
  belongsTogether('pre', edited.toLocaleDateString(), newdiv);
  newdiv.append(deleteButton);
  newdiv.append(editButton);
  deleteButton.innerHTML = 'Remove';
  deleteButton.id = "delete-button";
  editButton.innerHTML = 'Edit';
  editButton.id = 'edit-button';
}

function belongsTogether(element, item, newdiv) {
  let newElement = document.createElement(element);
  newElement.append(item);
  if (element === 'cite') {
    const title = document.createElement(element);
    title.id = 'title-input';
    title.append(item);
    newdiv.append(title)
  }
  if (element === 'pre') {
    const entry = document.createElement(element);
    entry.id = 'entry-input';
    entry.append(item);
    newdiv.append(entry);
  }
}