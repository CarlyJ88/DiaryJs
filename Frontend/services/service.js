import axios from "axios";

const base = window.location.host.split(":")[0];

export function getEntries() {
  return axios.get(`http://${base}:4000/list`).then((res) => res.data);
}

export function addEntry(title, entry, categoryId, link) {
  return axios.post(`http://${base}:4000/add-entry`, {
    title: title,
    entry: entry,
    categoryId: categoryId,
    link: link,
  });
}

export function deleteEntry(id) {
  const base = window.location.host.split(":")[0];
  return axios.delete(`http://${base}:4000/delete-entry`, {
    data: {
      id: id,
    },
  });
}

export function editEntry(title, entry, categoryId, link, id) {
  return axios.put(`http://${base}:4000/edit-entry`, {
    title: title,
    entry: entry,
    categoryId: categoryId,
    link: link,
    id: id,
  });
}

export function getCategories() {
  return axios
    .get(`http://${base}:4000/list-categories`)
    .then((res) => res.data);
}
