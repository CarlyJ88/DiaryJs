import axios from 'axios';

function app() {
  getEntries();
}

function getEntries() {
  axios.get('http://localhost:4000/list')
    .then(res => res.data)
    .then(listEntries)
}

function createForm(modalDiv, form7, closeButton, titleLabel, titleInput2, myTextLabel, myTextArea2, submit2) {
  modalDiv.id = 'edit-modal-background';
  form7.id = 'edit-form';
  closeButton.id = 'close-form';
  titleInput2.id = 'title-input2'
  myTextArea2.id = 'text-area2';
  submit2.id = 'submit2';
  closeButton.innerHTML = 'X';
  titleLabel.innerHTML = 'Title';
  myTextLabel.innerHTML = "Today's Thoughts";
  titleInput.type = "text";
  submit2.type = "submit";
  submit2.value = "Send Request";
  form7.append(closeButton);
  form7.append(titleLabel);
  form7.append(titleInput2);
  form7.append(myTextLabel);
  form7.append(myTextArea2);
  form7.append(submit2);
  modalDiv.append(form7);
  body.append(modalDiv);
}

// add entry from text box
form6.addEventListener('submit', (event) => {
  event.preventDefault();
  axios.post('http://localhost:4000/add-entry', {
      title: titleInput.value,
      entry: myTextArea.value
    })
    .then(function (response) {
      const newdiv = document.createElement('div');
      newdiv.id = 'input-div';
      let deleteButton = document.createElement('button');
      let editButton = document.createElement('button');
      combineEntry(newdiv, deleteButton, editButton, response.data);
      body.append(newdiv);
    })
    .then(() => {
      titleInput.value = "";
      myTextArea.value = "";
    })
    .catch(function (error) {
      console.log(error);
    });
});

function belongsTogether(element, item, newdiv) {
  let newElement = document.createElement(element);
  newElement.append(item);
  newdiv.append(newElement);
}

function listEntries(diaryEntries) {
  for (let i = 0; i < diaryEntries.length; i++) {
    const newdiv = document.createElement('div');
    newdiv.id = 'input-div';
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    combineEntry(newdiv, deleteButton, editButton, diaryEntries[i]);
    deleteEntry(diaryEntries[i].id, newdiv, deleteButton);
    
    // create new form to edit entry
    editButton.addEventListener('click', (event) => {
      event.preventDefault();
      const modalDiv = document.createElement('div');
      modalDiv.id = 'modal';
      const form7 = document.createElement('form');
      const closeButton = document.createElement('button');
      const titleLabel = document.createElement('label');
      const titleInput2 = document.createElement('input');
      const myTextLabel = document.createElement('label');
      const myTextArea2 = document.createElement('textarea');
      const submit2 = document.createElement('input');
      createForm(modalDiv, form7, closeButton, titleLabel, titleInput2, myTextLabel, myTextArea2, submit2);

      closeButton.addEventListener('submit', (event) => {
        event.preventDefault();
        modalDiv.remove();
      })

      // edit entry
      form7.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(titleInput2.value, 'titleinput', myTextArea2.value, 'mytextarea');
        axios.put('http://localhost:4000/edit-entry', {
            title: titleInput2.value,
            entry: myTextArea2.value,
            id: diaryEntries[i].id
        })
        .then(function (response) {
          console.log(response.data);
          const newdiv2 = document.createElement('div');
          let deleteButton = document.createElement('button');
          let editButton = document.createElement('button');
          combineEntry(newdiv2, deleteButton, editButton, response.data);
          body.append(newdiv2);
          newdiv.remove();
          modalDiv.remove();
        })
      // todo: add error handling
      }); 

    })
    body.append(newdiv);
  }
}

function combineEntry(newdiv, deleteButton, editButton, diaryEntries) {
  // newdiv.style = "text-align: center";
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', diaryEntries.date, newdiv);
  newdiv.append(deleteButton);
  newdiv.append(editButton);
  deleteButton.innerHTML = 'Remove';
  editButton.innerHTML = 'Edit';
}

function deleteEntry(id, newdiv, deleteButton) {
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    axios.delete('http://localhost:4000/delete-entry', {
        data: {
          id: id
        },
      })
      .then(() => newdiv.remove())
    // todo: add error handling
  })
}

app();
