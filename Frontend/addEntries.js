import {addEntry} from './service';
import createEntryPopup from './createEntryPopup';
import combineEntry from './entryDisplay';

export function addEntryHandler(form) {
  form.addEventListener('submit', (event) => {
    const formDatas = new FormData(event.currentTarget);

    event.preventDefault();
    addEntry(formDatas.get('title'), formDatas.get('textArea'))
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
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

export function newEntryButton() {
  const addEntryButton = document.createElement('button');
  addEntryButton.id = 'add-form';
  addEntryButton.innerHTML = 'Add Entry';
  body.append(addEntryButton);

  addEntryButton.addEventListener('click', (event) => {
    event.preventDefault();
    const form = createEntryPopup();
    addEntryHandler(form);
  });
}