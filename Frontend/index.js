import axios from 'axios';

// add entry from text box
form6.addEventListener('submit', (event) => {
  event.preventDefault();
  axios.post('http://localhost:4000/add-entry', {
      title: titleInput.value,
      entry: myTextArea.value
    })
    .then(function (response) {
      const newdiv = document.createElement('div');
      let deleteButton = document.createElement('button');
      let editButton = document.createElement('button');
      createEntry(newdiv, deleteButton, editButton, response.data);
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

// get diary entries
axios.get('http://localhost:4000/list')
  .then(res => res.data)
  .then(listEntries)

function belongsTogether(element, item, newdiv) {
  let newElement = document.createElement(element);
  newElement.append(item);
  newdiv.append(newElement);
}

function listEntries(diaryEntries) {
  for (let i = 0; i < diaryEntries.length; i++) {
    const newdiv = document.createElement('div');
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');
    createEntry(newdiv, deleteButton, editButton, diaryEntries[i]);

    // delete entry
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      axios.delete('http://localhost:4000/delete-entry', {
          data: {
            id: diaryEntries[i].id
          },
        })
        .then(() => newdiv.remove())
      // todo: add error handling
    })
    // create new form to edit entry
    editButton.addEventListener('click', (event) => {
      event.preventDefault();
      const modalDiv = document.createElement('div');
      modalDiv.id = 'modal';
      modalDiv.style = 'position: fixed; z-index: 999; left: 25%; height: 100%; width: 100%; top: 0; left: 0; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center;'
      const form7 = document.createElement('form');
      form7.style = 'border: 3px solid #1e1e1f; background: #Fdfcfa; width: 750px; height: 500px; position: absolute; top: 0%; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; top: 25%'
      const titleLabel = document.createElement('label');
      titleLabel.innerHTML = 'Title';
      const titleInput2 = document.createElement('input');
      titleInput2.style = 'width: 150px; position relative; background: #Fdfcfa; right: 50%'
      const myTextLabel = document.createElement('label');
      myTextLabel.innerHTML = "Today's Thoughts";
      const myTextArea2 = document.createElement('textarea');
      myTextArea2.style = 'height: 150px; background: #Fdfcfa; width: 500px'
      const submit2 = document.createElement('input');
      titleInput.type = "text";
      submit2.type = "submit";
      submit2.value = "Send Request";
      submit2.style = "width: 100px"
      submit2.style = "margin-bottom: 5px";
      form7.append(titleLabel);
      form7.append(titleInput2);
      form7.append(myTextLabel);
      form7.append(myTextArea2);
      form7.append(submit2);
      modalDiv.append(form7);
      body.append(modalDiv);
      // newdiv.append(form7);
      console.log(titleInput2.value, 'titleinput', myTextArea2.value, 'mytextarea')

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
          createEntry(newdiv2, deleteButton, editButton, response.data);
          body.append(newdiv2);
          newdiv.remove();
        })
      // todo: add error handling
      });
    })
    body.append(newdiv);
  }
}

function createEntry(newdiv, deleteButton, editButton, diaryEntries) {
  newdiv.style = "text-align: center";
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', diaryEntries.date, newdiv);
  newdiv.append(deleteButton);
  newdiv.append(editButton);
  deleteButton.innerHTML = 'Remove';
  editButton.innerHTML = 'Edit';
}