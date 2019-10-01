'use strict';
const base_URL = 'https://thinkful-list-api.herokuapp.com/julio';
const headerContent = {'Content-Type': 'application/json'}

function getURLs() {
    return fetch(`${base_URL}/bookmarks`)
}

function createBookmark(title,url,descr,rate) {
    let newBookmark = JSON.stringify({
        title,
        url,
        descr,
        rate
    });
    return fetch(`${base_URL}/bookmarks`, {
        method: 'POST',
        headers: headerContent,
        body: newURL
    })
}

function updateURL(id, updateData) {
    const update = JSON.stringify(updateData);
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'PATCH',
      headers: headerContent,
      body: update
    })
}

function deleteItem(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: headerContent,
    })
}

export default {
    getURLs,
    createBookmark,
    updateURL,
    deleteItem
  };

