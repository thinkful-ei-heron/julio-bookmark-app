import store from './store';
import api from './api';
import $ from '../node_modules/jquery';

const firstPage = `
<div class="submit-buttons">
  <button class="landing-button" id="js-new-item-button" type="submit">New</button>
<form>
  <select class="landing-button" id="js-filter-button" type="submit" name="Filter">
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
  <button id="cancel-button">CANCEL</button>`;

  let adding = store.addURL;

function generateListItem(item){
  $('.bookmark-input').append(`<li ><a href="${item[2]}">${item[1]}</a><button id="${item[0]}" class="delete-button">Delete</button>`);
};

function generateList(list) {
  let entries = Object.values(list);
  generateListItem(entries);
};

function renderList() {
  $('.bookmark-input').empty();
  let localItems = store.bookmarks.forEach(list => generateList(list));
  if(adding === true) {
    $('.form-input').empty();
    $('.bookmark-input').empty();
    $('.form-input').html(addItemHtml);
    $('.bookmark-input').html(localItems);
    adding = false;
  }
  else {
    $('.form-input').html(firstPage);
    $('.bookmark-input').html(localItems);
  }
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
       // e.preventDefault();
        let itemDeleted = $('.delete-button').attr('id');
        api.deleteBookmark(itemDeleted)
            .then((item) => {
                store.findAndDelete(itemDeleted);
                renderList();
            });
    })
};

function handleFilter() {

};

function handleExpand() {

};

function handleEdit() {

};

function bindEventListeners() {
  handleNewItemSubmit();
  handleItemDelete();
  handleExpand();
  handleFilter();
  handleEdit();
  handleCancel();
  //makeNewBookmark();
};

export default {
  renderList,
  bindEventListeners
};