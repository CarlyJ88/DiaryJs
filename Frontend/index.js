import { showEntryHandler } from './showEntries';
import { newEntryButton } from './addEntries';
// import createEntryDisplay from './createEntryDisplay';
import listEntriesPage from './listEntriesPage';
import header from './header';

function app() {
  header();
  // newEntryButton();
  showEntryHandler()
    .then(listEntries);
}

function listEntries(diaryEntries) {
  const list = document.createElement('ul');
  list.id = 'show-entries';
  const date = document.createElement('h1');
  date.id = 'date'
  body.append(date);
  
  for (let i = 0; i < diaryEntries.length; i++) {
    const fixDate = new Date(diaryEntries[i].date) // Fri Nov 19 2021 19:18:19 GMT+0000 (Greenwich Mean Time)
    const month = fixDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    console.log(month, 'month')
    date.innerHTML = month;
    // createEntryDisplay(diaryEntries[i]);
    listEntriesPage(diaryEntries[i], list);
  }
}

app();
