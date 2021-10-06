import { showEntryHandler } from './showEntries';
import { newEntryButton } from './addEntries';
// import createEntryDisplay from './createEntryDisplay';
import listEntriesPage from './listEntriesPage';

function app() {
  // newEntryButton();
  showEntryHandler()
    .then(listEntries);
}

function listEntries(diaryEntries) {
  const list = document.createElement('ul');
  list.id = 'show-entries';

  for (let i = 0; i < diaryEntries.length; i++) {
    // createEntryDisplay(diaryEntries[i]);
    listEntriesPage(diaryEntries[i], list);
  }
}

app();
