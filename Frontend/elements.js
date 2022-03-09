export function createBlog() {
  const blog = document.createElement("textarea");
  blog.className = "myBlog";
  blog.style.height = "100%";
  blog.style.width = "100%";
  tinymce.init({
    selector: ".myBlog",
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
    toolbar_location: "bottom",
    skin: "outside",
    menubar: true,
  });
  return blog;
}

export const createTitleLabel = () => {
  const labelTitle = document.createElement("label");
  labelTitle.innerText = "Title";
  body.appendChild(labelTitle);
  return labelTitle;
};

export const createTitle = () => {
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

export const createBlogLabel = () => {
  const labelBlog = document.createElement("label");
  labelBlog.innerText = "Blog";
  body.appendChild(labelBlog);
  return labelBlog;
};

export const createArticleLabel = () => {
  const labelArticle = document.createElement("label");
  labelArticle.innerText = "Article";
  body.appendChild(labelArticle);
  return labelArticle;
};

export const createArticle = () => {
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

export const createSubmitButton = () => {
  const submit = document.createElement("button");
  submit.id = "newEntrySubmit";
  submit.innerText = "Submit";
  body.appendChild(submit);
  return submit;
};
