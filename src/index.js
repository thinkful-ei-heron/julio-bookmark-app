import $ from 'jquery'
import './index.css'
import store from './store'
import bookmark from './bookmark'
import api from './api'

const main = function(){
    api.getURLs()
        .then((bookmarks) => {
            bookmarks.forEach((bookmark) => store.addURL(bookmark));
            bookmark.render();

    })
    .catch(err => console.log(err.message));
}

$(main)