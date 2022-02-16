import { addEntry } from "../services/service";
import header from "../header";

const createTitleLabel = () => {
  const labelTitle = document.createElement("label");
  labelTitle.innerText = "Title";
  // body.appendChild(labelTitle);
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
  // body.appendChild(title);
  return title;
};

const createBlogLabel = () => {
  const labelBlog = document.createElement("label");
  labelBlog.innerText = "Blog";
  // body.appendChild(labelBlog);
  return labelBlog;
};

const createBlog = () => {
  const blog = document.createElement("textarea");
  blog.id = "newBlog";
  blog.style.height = "100%";
  blog.style.width = "100%";
  // body.appendChild(blog);
  tinymce.init({
    selector: "#newBlog",
    plugins: [
      "advlist emoticons advlist image wordcount link casechange linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker",
    ],
    toolbar1:
      "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2:
      "image | forecolor backcolor casechange emoticons spellchecker | link | checklist | code | table",
    // to-do: "addcomment showcomments export"
    toolbar_mode: "floating",
    advlist_number_styles: "lower-alpha",
    toolbar_location: "bottom",
    skin: "outside",
    menubar: false,
    tinycomments_mode: "embedded",
    tinycomments_author: "Author name",
  });
  return blog;
};

const createArticleLabel = () => {
  const labelArticle = document.createElement("label");
  labelArticle.innerText = "Article";
  // body.appendChild(labelArticle);
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
  // body.appendChild(article);
  return article;
};

const createSubmitButton = () => {
  const submit = document.createElement("button");
  submit.id = "newEntrySubmit";
  submit.innerText = "Submit";
  // submit.style.justifyContent = 'center';
  // body.appendChild(submit);
  return submit;
};

export default function createEntry(entry) {
  const div = document.createElement("div");
  div.className = "container";
  const headers = header(null, "new", null, "/new");
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
    addEntry(title.value, blog.value, 4, article.value)
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
