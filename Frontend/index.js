import { showEntryHandler } from './showEntries';
import { newEntryButton } from './addEntries';
import { deleteEntryHandler } from './deleteEntries';
import { editEntryHandler } from './editEntries';
import createEntryPopup from './createEntryPopup';
import combineEntry from './entryDisplay';

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

app();
