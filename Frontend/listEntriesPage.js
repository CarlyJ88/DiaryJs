export default function listEntriesPage(entry, list) {
  console.log('listEntriesPage')
  const newdiv = document.createElement('div');
  newdiv.id = 'input-div';
  const item = document.createElement('li');
  item.className = 'diary-item';
  const itemTitle = document.createElement('h3');
  const itemEntry = document.createElement('p');
  itemEntry.className = 'item-entry';
  itemTitle.innerHTML = entry.title;
  itemEntry.innerHTML = entry.entry;
  item.append(itemTitle);
  item.append(itemEntry);
  list.append(item);
  body.append(list);

  if (entry.category === 'CSS') {
    item.style.backgroundColor = 'rgba(149, 16, 172, 0.2)';
    item.style.border = '#9510AC solid 3px';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.width = 'calc(100% - 30px)';
  }
  else if (entry.category === 'Clean Code') {
    item.style.backgroundColor = 'rgba(65, 75, 178, 0.2)';
    item.style.border = '#414BB2 solid 3px';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.width = 'calc(100% - 30px)';
  }
  else if (entry.category === 'Design Patterns') {
    item.style.backgroundColor = 'rgba(242, 71, 38, 0.2)';
    item.style.border = '#F24726 solid 3px';
    item.style.display = 'flex';
    item.style.flexDirection = 'column';
    item.style.width = 'calc(100% - 30px)';
  }
}

// option 1 (clicking on item will load the next page - don't need JavaScript to implement this = easiest option + keep it simple + good for accessibilty as well because the screen reader would know it's a link)
// <div>
//   <a href=" will contain my item id">
//   <h3></h3>
//   <p></p>
// </a>
// </div>

// option 2 (click handler will read the data id and load the next screen)
{/* <div data-id="1">
  <h3></h3>
  <p></p>
</div> */}

// option 3 (each div has its own click handler and that function knows the id (not the best for debugging but better if you need to hide the id))
{/* <div>
  <h3></h3>
  <p></p>
</div> */}