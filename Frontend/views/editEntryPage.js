import { showEntryHandler } from "../services/showEntries";
import { editEntry } from "../services/service";
import header from "../header";
import save from "../save.png";
import { navigateTo } from "../routing";
import {
  createBlog,
  createTitleLabel,
  createTitle,
  createArticleLabel,
  createArticle,
  createBlogLabel,
} from "../elements";

function handleEntry(title, blog, entryId, article) {
  return (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    editEntry(title.value, blog.value, 4, article.value, entryId.id)
      .then((response) => {
        navigateTo(`/show/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
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

  const titleLabel = createTitleLabel();
  const title = createTitle();
  const articleLabel = createArticleLabel();
  const article = createArticle();
  const blogLabel = createBlogLabel();
  const blog = createBlog();
  await showEntryData(entryId, title, article, blog);
  const headers = header(
    "edit",
    save,
    null,
    "Save item",
    handleEntry(title, blog, entryId, article)
  );
  div.append(headers);
  div.append(titleLabel);
  div.append(title);
  div.append(title);
  div.append(articleLabel);
  div.append(article);
  div.append(blogLabel);
  div.append(blog);
  return div;
}
