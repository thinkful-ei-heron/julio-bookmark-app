import bookmark from './bookmark';
import store from './store';
import api from './api';
import $ from '../node_modules/jquery';

const main = function() {
  api.getURLs()
    .then((items) => {
      items.forEach((item) => store.addURL(item));
      bookmark.renderList();
    });
  bookmark.bindEventListeners();
  bookmark.renderList();
};

$(main);