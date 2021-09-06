import combineEntry from './entryDisplay';
import { deleteEntryHandler } from './deleteEntries';
import { editEntryHandler } from './editEntries';
import createEntryPopup from './createEntryPopup';

export default function createEntryDisplay(entry) {
  const newdiv = document.createElement('div');
    newdiv.id = 'input-div';
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');
    let closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    combineEntry(newdiv, deleteButton, editButton, entry);
    body.append(newdiv);

    deleteEntryHandler(entry.id, newdiv, deleteButton);
    
    // create new form to edit entry
    editButton.addEventListener('click', (event) => {
      event.preventDefault();
      const form = createEntryPopup();
      editEntryHandler(form, entry, newdiv);

      closeButton.addEventListener('submit', (event) => {
        event.preventDefault();
        modalDiv.remove();
      })
      
    })

    return newdiv;
}
