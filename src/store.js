  //import bookmark from './bookmark';
  
  const bookmarks = [];
  let newURL = false;
  let error = null;
  let filter = 0;
  
  
  const addURL = function(newBookmark){
    this.bookmarks.push(newBookmark);
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

  function filterFunction(rank) {
      this.filter = rank;
  }
  
  
  
  
  export default {
    bookmarks,
    newURL,
    error,
    filter,
    addURL,
    findById,
    findAndDelete,
    findAndUpdate,
    filterFunction
  }