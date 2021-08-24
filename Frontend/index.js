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
      let button1 = document.createElement('button');
      let button2 = document.createElement('button');
      createEntry(newdiv, button1, button2, response.data);
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
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    createEntry(newdiv, button1, button2, diaryEntries[i]);

    button1.addEventListener('click', (event) => {
      event.preventDefault();
      axios.delete('http://localhost:4000/delete-entry', {
          data: {
            id: diaryEntries[i].id
          },
        })
        .then(() => newdiv.remove())
      // todo: add error handling
    })
    button2.addEventListener('click', (event) => {
      event.preventDefault();
      const form7 = document.createElement('form');
      const titleInput2 = document.createElement('input');
      const myTextArea2 = document.createElement('textarea');
      const submit2 = document.createElement('input');
      titleInput.type = "text";
      submit2.type = "submit";
      submit2.value = "Send Request";
      submit2.style = "margin-bottom: 5px";
      submit2.style.background = "#FF1493";
      form7.append(titleInput2);
      form7.append(myTextArea2);
      form7.append(submit2);
      newdiv.append(form7);
      console.log(titleInput2.value, 'titleinput', myTextArea2.value, 'mytextarea')

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
          let button1 = document.createElement('button');
          let button2 = document.createElement('button');
          createEntry(newdiv2, button1, button2, response.data);
          body.append(newdiv2);
          newdiv.remove();
        })
      // todo: add error handling
      });
      




  
    })
    body.append(newdiv);
  }
}

function createEntry(newdiv, button1, button2, diaryEntries) {
  newdiv.style = "text-align: center";
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', diaryEntries.date, newdiv);
  newdiv.append(button1);
  newdiv.append(button2);
  button1.innerHTML = 'Remove';
  button2.innerHTML = 'Edit';
}