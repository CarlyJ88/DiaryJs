import back from './arrowback_111142.png';
import write from './new.png';

export default function header() {
  let title = document.createElement('h2');
  title.id = 'header-title'
  let backButton = document.createElement('img');
  let newItemButton = document.createElement('img');
  backButton.src = back;
  backButton.alt = "Back button";
  backButton.width = 40;
  backButton.height = 40;
  backButton.id = 'header-back-button'

  newItemButton.src = write;
  newItemButton.alt = "New item";
  newItemButton.width = 40;
  newItemButton.height = 40;
  newItemButton.id = 'header-new-item-button'
  const headers = document.createElement('div');
  title.innerHTML = "Something";
  headers.className = 'headers';
  // headers.appendChild(title);
  headers.append(backButton);
  headers.append(title);
  headers.append(newItemButton);
  body.append(headers);
}