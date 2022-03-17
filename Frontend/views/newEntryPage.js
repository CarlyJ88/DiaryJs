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

function handleEntry(title, blog, categoryId, article) {
  return (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    addEntry(title.value, blog.value, categoryId.categoryId, article.value)
      .then((response) => {
        navigateTo(`/show/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default function createEntry(categoryId) {
  const div = document.createElement("div");
  div.className = "container";
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
    handleEntry(title, blog, categoryId, article)
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
