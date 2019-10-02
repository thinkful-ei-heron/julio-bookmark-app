import store from './store';
import api from './api';
import $ from '../node_modules/jquery';

const firstPage = `
<div class="submit-buttons">
  <button class="add-button" id="js-new-item-button" type="submit">New</button>
<form>
  <select class="filter-button" id="js-filter-button">
    <option value='0'>Min Rating</option>
    <option value='1'>☆</option>
    <option value='2'>☆☆</option>
    <option value='3'>☆☆☆</option>
    <option value='4'>☆☆☆☆</option>
    <option value='5'>☆☆☆☆☆</option>
  </select>
</form>
</div>`;
const addItemHtml =
`<form id="submit-form">
  <input type="text" name="title" placeholder="Input Title" required>
  <div><input type="url" name="url" placeholder="Input URL" required></div>
  <label for="desc">Add Description</label>
  <div><textarea name="desc">
  </textarea></div>
  <div><select id="rating" type="submit" name="rating">
    <option>Choose a Rating</option>
    <option value='5'>☆☆☆☆☆</option>
    <option value='4'>☆☆☆☆</option>
    <option value='3'>☆☆☆</option>
    <option value='2'>☆☆</option>
    <option value='1'>☆</option>
  </select></div>
  <button type="submit" for="submit-form">Submit</button>
</form>
  <button id="cancel-button">Cancel</button>`;

  let adding = store.addURL;

function generateListItem(item){
    return `
    <li id='${item.title}'><a href="${item.url}">${item.title}</a>
    <button id="${item.title}" class="delete-button">Delete</button>
    <button id="${item.title}" class="expand-button">Expand</button>
    </li>
    `
};

function generateList(list) {
  let entries = Object.values(list);
  generateListItem(entries);
};

function renderList() {
    console.log(store.filter);
    $('.bookmark-input').empty();
    let localItems = store.bookmarks.map(list => generateList(list));
    if(store.filter !== 0) {
        let filteredItems = store.bookmarks.filter((bkm) => bkm.rating >= store.filter);
        localItems = filteredItems.map((item) => generateListItem(item));
        console.log(localItems);
    } else if(adding === true) {
    $('.form-input').empty();
    $('.bookmark-input').empty();
    $('.form-input').html(addItemHtml);
    $('.bookmark-input').html(localItems);
    adding = false;
    } else {
    $('.form-input').html(firstPage);
  }
    $('.bookmark-input').html(localItems);
};

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

function handleCancel() {
  $('.form-input').on('click', '#cancel-button', (e) => {
    renderList();
  });
};

function handleNewItemSubmit() {
    $('.form-input').on('click', '#js-new-item-button', e => {
      adding = true;
      renderList();
      makeNewBookmark();
    }); 
  };
  


function makeNewBookmark() {
    $('#submit-form').submit(e => {
    e.preventDefault();
    let formElement = $('#submit-form')[0];
    api.createBookmark(serializeJson(formElement))
        .then((url) => {
            store.addURL(url);
            adding = false;
            renderList();
        });
  });
};

function handleItemDelete() {
    $('.bookmark-input').on('click','.delete-button', e => {
        let itemDeleted = $('.delete-button').attr('id');
        api.deleteBookmark(itemDeleted)
            .then((item) => {
                store.findAndDelete(itemDeleted);
                renderList();
            });
    })
};

function handleExpand() {
    $('.bookmark-input').on('click','.expand-button', e => {
        e.preventDefault();
        let id = $('.expand-button').attr('id');
        let storeObj = store.bookmarks
        function search(id,storeObj) {
            for(let i=0;i<storeObj.length;i++) {
                if(storeObj[i].id === id) {
                    return storeObj[i];
                }
            }
        }
        let selectedListItem = document.getElementById(id);
        $(selectedListItem).after(search(id,storeObj).desc,search(id,storeObj).rating);
    })
};

function handleFilter() {
    $('.form-input').on('change','#js-filter-button',e => {
        store.filterFunction(e.currentTarget.value);
    })
};

function bindEventListeners() {
  handleNewItemSubmit();
  handleItemDelete();
  handleExpand();
  handleFilter();
  handleCancel();
};

export default {
  renderList,
  bindEventListeners
};