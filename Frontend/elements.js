export function createBlog() {
  const blog = document.createElement("textarea");
  blog.className = "myBlog";
  blog.style.height = "100%";
  blog.style.width = "100%";
  tinymce.init({
    target: blog,
    plugins: [
      "advlist emoticons advlist image wordcount link autolink lists media table codesample",
    ],
    toolbar1:
      "styleselect | bold italic | alignleft | aligncenter | alignright | alignjustify",
    toolbar2:
      "bullist | numlist | outdent | indent | image | forecolor backcolor emoticons spellchecker | link | code | table | image | codesample",
    // to-do: "addcomment showcomments export"
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
  return title;
};

export const createBlogLabel = () => {
  const labelBlog = document.createElement("label");
  labelBlog.innerText = "Blog";
  return labelBlog;
};

export const createArticleLabel = () => {
  const labelArticle = document.createElement("label");
  labelArticle.innerText = "Article";
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
  return article;
};

export const createSubmitButton = () => {
  const submit = document.createElement("button");
  submit.className = "button";
  submit.innerText = "Submit";
  return submit;
};
