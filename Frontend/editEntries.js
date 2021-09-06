import { editEntry } from './service';
import combineEntry from './entryDisplay';

export function editEntryHandler(form, entries, newdiv) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formDatas = new FormData(event.currentTarget);
    editEntry(formDatas.get('title'), formDatas.get('textArea'), entries.id)
      .then(function (response) {
        const newdiv = document.createElement('div');
        newdiv.id = 'input-div';
        let deleteButton = document.createElement('button');
        let editButton = document.createElement('button');
        combineEntry(newdiv, deleteButton, editButton, response.data);
        body.append(newdiv);
      })
      .then(() => {
        form.parentElement.remove();
        newdiv.remove();
      })
  // todo: add error handling
  }); 
}
