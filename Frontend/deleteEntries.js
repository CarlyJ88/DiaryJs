import { deleteEntry } from './service';

export function deleteEntryHandler(id, newdiv, deleteButton) {
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    deleteEntry(id)
      .then(() => newdiv.remove())
    // todo: add error handling
  })
}
