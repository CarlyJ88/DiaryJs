import {addEntry} from './service';
import createEntryPopup from './createEntryPopup';
import createEntryDisplay from './createEntryDisplay';

export function addEntryHandler(form) {
  form.addEventListener('submit', (event) => {
    const formDatas = new FormData(event.currentTarget);

    event.preventDefault();
    addEntry(formDatas.get('title'), formDatas.get('textArea'))
      .then(function (response) {
        createEntryDisplay(response.data);
      })
      .then(() => {
        form.parentElement.parentElement.remove();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

export function newEntryButton() {
  const addEntryButton = document.createElement('button');
  addEntryButton.id = 'add-form';
  addEntryButton.innerHTML = 'Add';
  body.append(addEntryButton);

  addEntryButton.addEventListener('click', (event) => {
    event.preventDefault();
    const form = createEntryPopup();
    addEntryHandler(form);
  });
}