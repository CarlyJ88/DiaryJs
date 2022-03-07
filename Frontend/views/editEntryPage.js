import { showEntryHandler } from "../services/showEntries";
import { editEntry } from "../services/service";
import header from "../header";
import { navigateTo } from "../routing";

export default function editEntryPage(entryId) {
  return showEntryHandler().then((diaryEntries) =>
    editCurrentEntry(diaryEntries, entryId.id)
  );
}

const container = () => {
  div = document.createElement("div");
  return div;
};

const createTitleLabel = () => {
  const labelTitle = document.createElement("label");
  labelTitle.innerText = "Title";
  body.appendChild(labelTitle);
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
  body.appendChild(title);
  return title;
};

const createBlogLabel = () => {
  const labelBlog = document.createElement("label");
  labelBlog.innerText = "Blog";
  body.appendChild(labelBlog);
  return labelBlog;
};

const createBlog = () => {
  const blog = document.createElement("textarea");
  blog.id = "newBlog";
  blog.style.height = "100%";
  blog.style.width = "100%";
  body.appendChild(blog);
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
    menubar: false,
  });
  return blog;
};

const createArticleLabel = () => {
  const labelArticle = document.createElement("label");
  labelArticle.innerText = "Article";
  body.appendChild(labelArticle);
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
  body.appendChild(article);
  return article;
};

const createSubmitButton = () => {
  const submit = document.createElement("button");
  submit.id = "newEntrySubmit";
  submit.innerText = "Submit";
  // submit.style.justifyContent = 'center';
  body.appendChild(submit);
  return submit;
};

function editCurrentEntry(diaryEntries, entryId) {
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

  for (let i = 0; i < diaryEntries.length; i++) {
    if (diaryEntries[i].id === Number(entryId)) {
      title.value = diaryEntries[i].title;
      article.value = diaryEntries[i].link;
      blog.value = diaryEntries[i].entry;
    }
  }
  // save.submit.addEventListener...
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
