export function submitEntry() {
  const entry = document.getElementById("myTextArea").value;
  document.getElementById('todaysThoughts').innerHTML = entry;
}

const form  = document.getElementById('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert(event);
    console.log(event)
  });
