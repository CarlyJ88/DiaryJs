import back from './arrowback_111142.png';
import write from './new.png';

const title = () => {
  let title = document.createElement('h2');
  // title.id = 'header-title'
  title.innerHTML = "Something";
  return title;
}

const backButton = () => {
  let backButton = document.createElement('img');
  backButton.src = back;
  backButton.alt = "Back button";
  backButton.width = 40;
  backButton.height = 40;
  // backButton.id = 'header-back-button'
  return backButton;
}

const newItemButton = () => {
  let newItemButton = document.createElement('img');
  newItemButton.src = write;
  newItemButton.alt = "New item";
  newItemButton.width = 40;
  newItemButton.height = 40;
  newItemButton.id = 'header-new-item-button'
  return newItemButton;
}

export default function header() {
  const header = document.createElement('div');
  header.className = 'header';
  header.append(backButton());
  header.append(title());
  header.append(newItemButton());
  body.append(header);
}