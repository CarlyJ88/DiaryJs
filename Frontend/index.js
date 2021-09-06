import { showEntryHandler } from './showEntries';
import { newEntryButton } from './addEntries';
import createEntryDisplay from './createEntryDisplay';

function app() {
  newEntryButton();
  showEntryHandler()
    .then(listEntries);
}

function listEntries(diaryEntries) {
  for (let i = 0; i < diaryEntries.length; i++) {
    createEntryDisplay(diaryEntries[i]);
  }
}

app();
