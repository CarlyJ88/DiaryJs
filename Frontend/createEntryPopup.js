// export function entryDiv() {
//   const div = document.createElement('div');
//   div.id = 'modal';
//   return div;
// }

export function closeButton() {
  const closeButton = document.createElement('button');
  closeButton.id = 'close-form';
  closeButton.innerHTML = 'X';
  return closeButton;
}

export function entryTitle() {
  const titleInput = document.createElement('input');
  titleInput.id = 'title-input2';
  titleInput.name = 'title';
  titleInput.type = "text";
  return titleInput;
}

export function entryLabel() {
  const titleLabel = document.createElement('label');
  titleLabel.innerHTML = 'Title';
  return titleLabel;
}

export function myTextLabel() {
  const myTextLabel = document.createElement('label');
  myTextLabel.innerHTML = "Today's Thoughts";
  return myTextLabel;
}

export function entryField() {
  const myTextArea2 = document.createElement('textarea');
  myTextArea2.id = 'text-area2';
  myTextArea2.name = 'textArea';
  return myTextArea2;
}

export function submitButton() {
  const submit2 = document.createElement('input');
  submit2.id = 'submit2';
  submit2.type = "submit";
  submit2.value = "Send Request";
  return submit2;
}

export default function createEntryPopup() {
  const form = document.createElement('form');
  form.id = 'edit-form';
  const div = document.createElement('div');
  div.id = 'edit-modal-background';
  form.append(closeButton());
  form.append(entryLabel());
  form.append(entryTitle());
  form.append(myTextLabel());
  form.append(entryField());
  form.append(submitButton());
  div.append(form);
  body.append(div);
  return form;
}
