import axios from 'axios';

// add entry from text box
form6.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event, 'event')
  axios.post('http://localhost:4000/add-entry', {
      title: titleInput.value,
      entry: myTextArea.value
    })
    .then(function (response) {
      console.log(response);
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
    newdiv.style = "text-align: center";
    belongsTogether('cite', diaryEntries[i].title, newdiv);
    belongsTogether('pre', diaryEntries[i].entry, newdiv);
    belongsTogether('pre', diaryEntries[i].date, newdiv);
    body.append(newdiv);
  }
}