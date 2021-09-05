import axios from 'axios';

export function getEntries() {
  return axios.get('http://localhost:4000/list')
    .then(res => res.data)
}

export function addEntry(title, entry) {
  return axios.post('http://localhost:4000/add-entry', {
    title: title,
    entry: entry
  })
}

export function deleteEntry(id) {
  return axios.delete('http://localhost:4000/delete-entry', {
    data: {
      id: id
    },
  })
}

export function editEntry(title, entry, id) {
  return axios.put('http://localhost:4000/edit-entry', {
      title: title,
      entry: entry,
      id: id
  })
}
