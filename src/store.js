'use strict';
const store = {
    bookmarks: [
       { 
        id: cuid(),
        title: 'Google',
        rating: 3,
        url: 'http://www.google.com',
        description: 'lorem ipsum dolor sit',
        expanded: false
       }
    ],
    adding: false,
    error: null,
    filter: 0
}


const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

const addURL = function (name) {
  this.items.push(name);
};

const findAndUpdateURL = function (id, newData) {
  let updatedItem = this.findById(id);
  Object.assign(updatedItem, newData);
}


const findAndDeleteURL = function (id) {
  this.items = this.items.filter(currentItem => currentItem.id !== id);
};

export default {
  store,
  findById,
  addURL,
  findAndUpdateURL,
  findAndDeleteURL,
};
