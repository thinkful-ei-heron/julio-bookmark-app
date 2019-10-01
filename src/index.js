import $ from 'jquery'
import './index.css'
import store from './store'
import bookmarkList from './bookmark-list'
import api from './api'

const main = function(){
    api.getURLs()
        .then((bookmarks) => {
            bookmarks.forEach((bookmark) => store.addURL(bookmark));
            bookmarksList.render();

    })
    .catch(err => console.log(err.message));
}

$(main)