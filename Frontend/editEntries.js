import { editEntry } from './service';

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
