import store from './store';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/julio';
const headerContent = {'Content-Type': 'application/json'}

const fetchApi = function(url, obj) {
  let error = false;
  return fetch(url, obj)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        store.error = error.message;
        return Promise.reject(error);
      }
      console.log(data);
      return data;
    });
};


  function getURLs() {
    return fetchApi(`${BASE_URL}/bookmarks`);
  }
  
  function createBookmark(bookmark) {
    const body = bookmark;
    console.log(body);
    return fetchApi(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: headerContent,
      body: body
    });
  }
  
  function deleteBookmark(id) {
    return fetchApi(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE'
    });
  }
  
  export default {
    fetchApi,
    getURLs,
    createBookmark,
    deleteBookmark
  };
  