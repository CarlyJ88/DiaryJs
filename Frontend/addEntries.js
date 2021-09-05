import {addEntry} from './service';
import createEntryPopup from './createEntryPopup';

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