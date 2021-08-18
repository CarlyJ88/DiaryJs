const axios = require('axios');

// add entry from text box
form6.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event, 'event')
  todaysThoughts.innerHTML = myTextArea.value;
});

// get diary entries
const diaryEntries = [];
axios.get('http://localhost:4000/list')
.then(res => res.data)
.then(data => data.forEach(element => {
  console.log(element, 'element')
  diaryEntries.push(element)
}))
.then(listEntries)
console.log(diaryEntries, 'diaryEntries');


function listEntries() {
  for (let i = 0; i < diaryEntries.length; i++){
    let newTitle = document.createElement('cite');
    let newTodaysThoughts = document.createElement('pre');
    newTitle.append(diaryEntries[i].title)
    newTodaysThoughts.append(diaryEntries[i].entry)
    body.append(newTitle);
    body.append(newTodaysThoughts);
  }
}
