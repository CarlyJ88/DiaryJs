import { addEntry } from "../services/service";
import header from "../header";
import { navigateTo } from "../routing";

const createTitleLabel = () => {
  const labelTitle = document.createElement("label");
  labelTitle.innerText = "Title";
  return labelTitle;
};

const createTitle = () => {
  const title = document.createElement("input");
  title.id = "newEntryTitle";
  title.type = "text";
  title.style.display = "flex";
  title.style.flexDirection = "column";
  title.style.width = "100%";
  title.style.height = "30px";
  return title;
};

const createBlogLabel = () => {
  const labelBlog = document.createElement("label");
  labelBlog.innerText = "Blog";
  return labelBlog;
};

const createBlog = () => {
  const blog = document.createElement("textarea");
  blog.id = "newBlog";
  blog.style.height = "100%";
  blog.style.width = "100%";
  tinymce.init({
    selector: "#newBlog",
    plugins: [
      "advlist emoticons advlist image wordcount link autolink lists media table",
    ],
    toolbar1:
      "styleselect | bold italic | alignleft | aligncenter | alignright | alignjustify",
    toolbar2:
      "bullist | numlist | outdent | indent | image | forecolor backcolor emoticons spellchecker | link | code | table | image",
    // to-do: "addcomment showcomments export"
    // not supported: casechange, linkchecker, checklist, mediaembed, pageembed, permanentpen, powerpaste, advtable, tinycomments, tinymcespellchecker
    toolbar_mode: "floating",
    advlist_number_styles: "lower-alpha",
    toolbar_location: "top",
    skin: "outside",
    menubar: true,
  });
  return blog;
};

const createArticleLabel = () => {
  const labelArticle = document.createElement("label");
  labelArticle.innerText = "Article";
  return labelArticle;
};

const createArticle = () => {
  const article = document.createElement("input");
  article.id = "newArticle";
  article.type = "text";
  article.style.display = "flex";
  article.style.flexDirection = "column";
  article.style.width = "100%";
  article.style.height = "30px";
  return article;
};

const createSubmitButton = () => {
  const submit = document.createElement("button");
  submit.id = "newEntrySubmit";
  submit.innerText = "Submit";

  return submit;
};

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
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    tinyMCE.triggerSave();
    addEntry(title.value, blog.value, categoryId.categoryId, article.value)
      .then((response) => {
        navigateTo(`/show/${response.data.id}`);
      })
      .then(() => {
        title.value = "";
        article.value = "";
        blog.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  });
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
