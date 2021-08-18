import axios from 'axios';

// add entry from text box
form6.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event, 'event')
  todaysThoughts.innerHTML = myTextArea.value;
});

// get diary entries
axios.get('http://localhost:4000/list')
.then(res => res.data)
.then(listEntries)

function belongsTogether(element, item){
  let newElement = document.createElement(element);
  newElement.append(item);
  body.append(newElement);
}

function listEntries(diaryEntries) {
  for (let i = 0; i < diaryEntries.length; i++){
    belongsTogether('cite', diaryEntries[i].title);
    belongsTogether('pre', diaryEntries[i].entry);
    belongsTogether('pre', diaryEntries[i].date);
  }
}

// post diary entry
