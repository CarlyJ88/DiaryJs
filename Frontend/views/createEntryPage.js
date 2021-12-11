import {addEntry} from '../service';

const createTitleLabel = () => {
  const labelTitle = document.createElement('label');
  labelTitle.innerText = 'Title';
  body.appendChild(labelTitle);
  return labelTitle;
}

const createTitle = () => {
  const title = document.createElement('input');
  title.id = 'newEntryTitle';
  title.type = "text";
  title.style.display = 'flex';
  title.style.flexDirection = 'column';
  title.style.width = '100%';
  title.style.height = '30px'
  body.appendChild(title);
  return title;
}

const createBlogLabel = () => {
  const labelBlog = document.createElement('label');
  labelBlog.innerText = 'Blog';
  body.appendChild(labelBlog);
  return labelBlog;
}

const createBlog = () => {
  const blog = document.createElement('textarea');
  blog.id = 'newBlog';
  blog.style.height = '100%';
  blog.style.width = '100%';
  body.appendChild(blog);
  return blog;
}

const createArticleLabel = () => {
  const labelArticle = document.createElement('label');
  labelArticle.innerText = 'Article';
  body.appendChild(labelArticle);
  return labelArticle;
}

const createArticle = () => {
  const article = document.createElement('input');
  article.id = 'newArticle';
  article.type = "text";
  article.style.display = 'flex';
  article.style.flexDirection = 'column';
  article.style.width = '100%';
  article.style.height = '30px';
  body.appendChild(article);
  return article;
}

const createSubmitButton = () => {
  const submit = document.createElement('button');
  submit.id = 'newEntrySubmit';
  submit.innerText = 'Submit';
  // submit.style.justifyContent = 'center';
  body.appendChild(submit);
  return submit;
}

export default function createEntry(entry) {
  console.log('createEntry')

  createTitleLabel();
  const title = createTitle();
  createArticleLabel();
  const article = createArticle();
  createBlogLabel();
  const blog = createBlog();
  const submit = createSubmitButton();

  submit.addEventListener('click', (event) => {
    event.preventDefault();
    addEntry(title.value, blog.value, 4, article.value)
      .then(() => {
        title.value = "";
        article.value = "";
        blog.value = "";
      })
    // .then(() => {
    //   console.log('am II here?')
    //   redirect to next page (add link?)
    // })
    .catch(function (error) {
      console.log(error);
    });
  })
}
