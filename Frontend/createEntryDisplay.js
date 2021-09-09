import combineEntry from './entryDisplay';
import { deleteEntryHandler } from './deleteEntries';
import { editEntryHandler } from './editEntries';
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
