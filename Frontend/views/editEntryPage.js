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

function handleEntry(title, blog, entryId, article, user) {
  return (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    editEntry(title.value, blog.value, 4, article.value, entryId.id, user.uid)
      .then((response) => {
        navigateTo(`/show/${response.data.id}`); // add date parameter??? /${year}-${formatMonth(month)}-${formatDay(day)}
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

export default async function editEntryPage(entryId, user) {
  const div = document.createElement("div");
  div.className = "container";
  const container = document.createElement("div");
  container.className = "entry-container";
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
    handleEntry(title, blog, entryId, article, user)
  );
  div.append(headers);
  container.append(titleLabel);
  container.append(title);
  container.append(articleLabel);
  container.append(article);
  container.append(blogLabel);
  container.append(blog);
  div.append(container);
  return div;
}
