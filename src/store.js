const bookmarks = [
    {
          id: '123',
          title: 'google',
          rating: 5,
          url: 'http://www.google.com',
          desc: 'this is google',
          expanded: false
      }  
  ];
  const newURL = false;
  const error = null;
  const filter = 0;
  
  
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
      this.filterBy = rank ;
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