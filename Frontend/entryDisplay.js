export default function combineEntry(newdiv, deleteButton, editButton, diaryEntries) {
  const date = new Date(diaryEntries.date);
  const edited = new Date(diaryEntries.edited);
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', date.toLocaleDateString(), newdiv);
  belongsTogether('pre', edited.toLocaleDateString(), newdiv);
  newdiv.append(deleteButton);
  newdiv.append(editButton);
  deleteButton.innerHTML = 'Remove';
  editButton.innerHTML = 'Edit';
}

function belongsTogether(element, item, newdiv) {
  let newElement = document.createElement(element);
  newElement.append(item);
  newdiv.append(newElement);
}
