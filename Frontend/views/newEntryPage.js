import { addEntry } from "../services/service";
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

function handleEntry(title, blog, categoryId, article, submit) {
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    addEntry(title.value, blog.value, categoryId.categoryId, article.value)
      .then((response) => {
        navigateTo(`/show/${response.data.id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

export default function createEntry(categoryId) {
  const div = document.createElement("div");
  div.className = "container";
  const headers = header(null, "new", null, "/new"); // new entry icon not needed?
  const titleLabel = createTitleLabel();
  const title = createTitle();
  const articleLabel = createArticleLabel();
  const article = createArticle();
  const blogLabel = createBlogLabel();
  const blog = createBlog();
  const submit = createSubmitButton();

  handleEntry(title, blog, categoryId, article, submit);

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
