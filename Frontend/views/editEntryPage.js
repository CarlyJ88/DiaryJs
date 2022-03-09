import { showEntryHandler } from "../services/showEntries";
import { editEntry } from "../services/service";
import header from "../header";
import { navigateTo } from "../routing";
import {
  createBlog,
  createTitleLabel,
  createTitle,
  createArticleLabel,
  createArticle,
  createBlogLabel,
  createSubmitButton,
} from "../elements";

function handleEntry(title, blog, entryId, article, submit) {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    editEntry(title.value, blog.value, 4, article.value, entryId)
      .then((response) => {
        navigateTo(`/show/${response.data.id}`);
      })
      .then(() => {
        title.value = "";
        article.value = "";
        blog.value = "";
      })
      .then(() => {
        console.log("am I here?");
        // redirect to next page (add link?)
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

async function fetchEntry(entryId) {
  const diaryEntries = await showEntryHandler();
  const currentEntry = diaryEntries.find(
    (entry) => entry.id === Number(entryId.id)
  );
  return currentEntry;
}

async function showEntryData(entryId, title, article, blog) {
  const currentEntry = await fetchEntry(entryId);
  if (!currentEntry) {
    navigateTo("/calendar");
    return;
  }
  title.value = currentEntry.title;
  article.value = currentEntry.link;
  blog.value = currentEntry.entry;
}

export default async function editEntryPage(entryId) {
  const div = document.createElement("div");
  div.className = "container";
  const headers = header(null, "edit", "save", "/new"); // figure which route/icon to add out later
  const titleLabel = createTitleLabel();
  const title = createTitle();
  const articleLabel = createArticleLabel();
  const article = createArticle();
  const blogLabel = createBlogLabel();
  const blog = createBlog();
  const submit = createSubmitButton();
  await showEntryData(entryId, title, article, blog);

  // save.submit.addEventListener...
  handleEntry(title, blog, entryId, article, submit);

  div.append(headers);
  div.append(titleLabel);
  div.append(title);
  div.append(title);
  div.append(articleLabel);
  div.append(article);
  div.append(blogLabel);
  div.append(blog);
  div.append(submit);
  return div;
}
