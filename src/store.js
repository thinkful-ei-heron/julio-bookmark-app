  import bookmark from './bookmark';
  
  const bookmarks = [];
  const newURL = false;
  const error = null;
  const filter = 0;
  
  
  const addURL = function(newBookmark){
    this.bookmarks.push(newBookmark);
    bookmark.renderList();
  }
  
  const findById = function(id){
    return this.bookmarks.find(currentItem => currentItem.id === id);
  }
  
  const findAndDelete = function(id){
    this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
  }
  
  const findAndUpdate = function(id, newData){
    let currentItem = this.findById(id);
    Object.assign(currentItem, newData);
  }

//   function filterFunction(rank) {
//       this.filterBy = rank ;
//   }
  
  
  
  
  export default {
    bookmarks,
    newURL,
    error,
    filter,
    addURL,
    findById,
    findAndDelete,
    findAndUpdate
    // filterFunction
  }