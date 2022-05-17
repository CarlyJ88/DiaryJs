import axios from "axios";

const protocol = window.location.protocol;
const base = window.location.host.split(":")[0];
const port = window.location.port !== 3000 ? window.location.port : 4000;
const baseUrl = `${protocol}//${base}:${port}`;

export function getEntries() {
  return axios.get(`${baseUrl}/list`).then((res) => res.data);
}

export function addEntry(title, entry, categoryId, link, userId) {
  return axios.post(`${baseUrl}/add-entry`, {
    title: title,
    entry: entry,
    categoryId: categoryId,
    link: link,
    incomingUserId: userId,
  });
}

export function deleteEntry(id) {
  const base = window.location.host.split(":")[0];
  return axios.delete(`${baseUrl}/delete-entry`, {
    data: {
      id: id,
    },
  });
}

export function editEntry(title, entry, categoryId, link, id, userId) {
  return axios.put(`${baseUrl}/edit-entry`, {
    title: title,
    entry: entry,
    categoryId: categoryId,
    link: link,
    id: id,
    incomingUserId: userId,
  });
}

export function getCategories() {
  return axios.get(`${baseUrl}/list-categories`).then((res) => res.data);
}

export function getEntriesByDate(dateStart, dateEnd, userId) {
  return axios
    .get(`${baseUrl}/list-entries-by-date`, {
      params: {
        dateComingInStart: dateStart,
        dateComingInEnd: dateEnd,
        incomingUserId: userId,
      },
    })
    .then((res) => res.data);
}

export function getCategoriesByDate(dateStart, dateEnd, userId) {
  return axios
    .get(`${baseUrl}/list-categories-by-date`, {
      params: {
        dateComingInStart: dateStart,
        dateComingInEnd: dateEnd,
        incomingUserId: userId,
      },
    })
    .then((res) => res.data);
}

export function selectEntryById(id, userId) {
  return axios
    .get(`${baseUrl}/list-entry-by-id`, {
      params: {
        id: id,
        incomingUserId: userId,
      },
    })
    .then((res) => res.data);
}
