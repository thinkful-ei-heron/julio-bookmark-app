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
       },
       {
        id: cuid(),
        title: 'Yahoo',
        rating: 3,
        url: 'http://www.yahoo.com',
        description: 'lorem ipsum dolor sit',
        expanded: false
       }
    ],
    adding: false,
    error: null,
    filter: 0
}