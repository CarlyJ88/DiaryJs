import { addEntry } from "../services/service";
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

function handleEntry(title, blog, categoryId, article, user) {
  return (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    addEntry(
      title.value,
      blog.value,
      categoryId.categoryId,
      article.value,
      user.uid
    )
      .then((response) => {
        navigateTo(`/show/${response.data.id}`); // add date parameter??? /${year}-${formatMonth(month)}-${formatDay(day)}
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default function createEntry(categoryId, user) {
  const div = document.createElement("div");
  const container = document.createElement("div");
  div.className = "container";
  container.className = "entry-container";
  const titleLabel = createTitleLabel();
  const title = createTitle();
  const articleLabel = createArticleLabel();
  const article = createArticle();
  const blogLabel = createBlogLabel();
  const blog = createBlog();
  const headers = header(
    "new",
    save,
    null,
    "Save item",
    handleEntry(title, blog, categoryId, article, user)
  );
  div.append(headers);
  container.append(titleLabel);
  container.append(title);
  container.append(title);
  container.append(articleLabel);
  container.append(article);
  container.append(blogLabel);
  container.append(blog);
  div.append(container);
  return div;
}
