import { editEntry } from "./service";
import createEntryDisplay from "../views/createEntryPage";

export function editEntryHandler(form, entries, newdiv) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formDatas = new FormData(event.currentTarget);
    editEntry(formDatas.get("title"), formDatas.get("textArea"), entries.id)
      .then(function (response) {
        createEntryDisplay(response.data);
      })
      .then(() => {
        form.parentElement.parentElement.remove();
        newdiv.remove();
      });
    // todo: add error handling
  });
}
