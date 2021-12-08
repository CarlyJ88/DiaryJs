

export default function createEntry(entry) {
  console.log('createEntry')
  const title = document.createElement('input');
  const labelTitle = document.createElement('label');
  title.type = "text";
  labelTitle.innerText = 'Title';
  title.style.display = 'flex';
  title.style.flexDirection = 'column';
  title.style.width = '100%';
  title.style.height = '30px'

  const article = document.createElement('input');
  const labelArticle = document.createElement('label');
  article.type = "text";
  labelArticle.innerText = 'Article';
  article.style.display = 'flex';
  article.style.flexDirection = 'column';
  article.style.width = '100%';
  article.style.height = '30px';

  const blog = document.createElement('textarea');
  const labelBlog = document.createElement('label');
  labelBlog.innerText = 'Blog';
  blog.style.height = '100%';
  blog.style.width = '100%';

  body.appendChild(labelTitle);
  body.appendChild(title);
  body.appendChild(labelArticle);
  body.appendChild(article);
  body.appendChild(labelBlog);
  body.appendChild(blog);

}

function combineEntry(newdiv, diaryEntries) {
  const date = new Date(diaryEntries.date);
  const edited = new Date(diaryEntries.edited);
  belongsTogether('cite', diaryEntries.title, newdiv);
  belongsTogether('pre', diaryEntries.entry, newdiv);
  belongsTogether('pre', date.toLocaleDateString(), newdiv);
  belongsTogether('pre', edited.toLocaleDateString(), newdiv);
}

function belongsTogether(element, item, newdiv) {
  let newElement = document.createElement(element);
  newElement.append(item);
  if (element === 'cite') {
    const title = document.createElement(element);
    title.id = 'title-input';
    title.append(item);
    newdiv.append(title)
  }
  if (element === 'pre') {
    const entry = document.createElement(element);
    entry.id = 'entry-input';
    entry.append(item);
    newdiv.append(entry);
  }
}