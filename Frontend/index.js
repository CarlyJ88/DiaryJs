import { showEntryHandler } from './showEntries';
import { newEntryButton } from './addEntries';
import { deleteEntryHandler } from './deleteEntries';
import { editEntryHandler } from './editEntries';
import createEntryPopup from './createEntryPopup';

function app() {
  newEntryButton();
  showEntryHandler()
    .then(listEntries);
}

function listEntries(diaryEntries) {
  for (let i = 0; i < diaryEntries.length; i++) {
    const newdiv = document.createElement('div');
    newdiv.id = 'input-div';
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');
    let closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';

    combineEntry(newdiv, deleteButton, editButton, diaryEntries[i]);
    deleteEntryHandler(diaryEntries[i].id, newdiv, deleteButton);
    
    // create new form to edit entry
    editButton.addEventListener('click', (event) => {
      event.preventDefault();
      const form = createEntryPopup();
      editEntryHandler(form, diaryEntries[i], newdiv);

      closeButton.addEventListener('submit', (event) => {
        event.preventDefault();
        modalDiv.remove();
      })
      
    })
    body.append(newdiv);
  }
}

function combineEntry(newdiv, deleteButton, editButton, diaryEntries) {
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', diaryEntries.date, newdiv);
  newdiv.append(deleteButton);
  newdiv.append(editButton);
  deleteButton.innerHTML = 'Remove';
  editButton.innerHTML = 'Edit';
}

function belongsTogether(element, item, newdiv) {
  let newElement = document.createElement(element);
  newElement.append(item);
  newdiv.append(newElement);
}

app();
