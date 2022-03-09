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
        // tinyMCE.triggerSave();
        console.log("am I here?");
        // redirect to next page (add link?)
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

async function getData() {
  const entries = showEntryHandler();
  const response = await entries;
  return response;
}

async function getEntries() {
  const entries = await getData();
  return entries;
}

async function showEntryData(entryId, title, article, blog) {
  const diaryEntries = getEntries();
  for (let i = 0; i < diaryEntries.length; i++) {
    if (diaryEntries[i].id === Number(entryId)) {
      title.value = diaryEntries[i].title;
      article.value = diaryEntries[i].link;
      blog.value = diaryEntries[i].entry;
    }
  }
}

export default function editEntryPage(entryId) {
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
  showEntryData(entryId, title, article, blog);

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
