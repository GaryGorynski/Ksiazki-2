let authors = [];
let genres = [];
let booklist = [];


class Author  {
    constructor(authorfname, authorlname, authorid) {
    this.authorfname = authorfname;
    this.authorlname = authorlname;
    this.authorid = authorid;
}

  get authorFullName () {
    return `${this.authorfname} ${this.authorlname}`;
  }
}

class Genre {
    constructor(genre, genreid) {
        this.genre = genre;
        this.genreid = genreid;
    }

    
}

class Book {
     constructor(title, released, authorid, genre){
        this.title = title;
        this.bookid = '#' + Math.floor(Math.random() * 100000);
        this.released = released; 
        this.authorid = authorid;
        this.genre = genre;
    }
}

class UI {

   addAuthor() {
        const authorcreator = document.getElementById('book-creator__author');
        const newOption = document.createElement('option');
        newOption.value = authors[authors.length - 1].authorid;
        newOption.innerHTML = authors[authors.length - 1].authorFullName;
      authorcreator.appendChild(newOption);             
    }

   addGenre() {
      const genrecreator= document.getElementById('book-creator__genre');
      const newOption = document.createElement('option');
      newOption.value = genres[genres.length - 1].genre;
      newOption.innerHTML = genres[genres.length - 1].genre;
      genrecreator.appendChild(newOption);
   }

  clearFields() {
        const title = document.getElementById('title').value = '';
        const released = document.getElementById('released').value = '';
    }

  addBook(book){
      const bookAuthor = authors.find(author => author.authorid === book.authorid);
      const bookGenre = genres.find( genre => genre.genre === book.genre)
      const list = document.getElementById('table__body');
      const row = document.createElement('tr'); 

        row.innerHTML = `
        <td data-book-title="${book.title}" id="title">${book.title}</td>
        <td>${bookAuthor.authorfname}</td>
        <td>${bookAuthor.authorlname}</td>
        <td>${book.bookid}</td>
        <td>${book.released}</td>
        <td>${book.authorid}</td>
        <td>${book.genre}</td>
        <td>${bookGenre.genreid}</td>
        <td><button value="delete" class="delete" id="delete" data-book-id="${book.bookid}">X</button></td>
        `;
        list.appendChild(row);         
    }
   
  deleteBook(target) {
     if(target.className === 'delete') {
     target.parentElement.parentElement.remove();
   }}
  
  deleteBookData(target) {
     if(target.className === 'delete') {
      let deleteBook = document.getElementById('delete');
      let bookID = deleteBook.getAttribute('data-book-id');
      booklist = booklist.filter(book => book.bookid !== bookID);
     }
    }
    displayBooks() {

    }
  }


const ui = new UI();
//submit author 
document.getElementById('author-form').addEventListener('submit', function(e){

    const authorfname = document.getElementById('authorfname').value;
    const authorlname = document.getElementById('authorlname').value;
    const authorid = document.getElementById('authorid').value;
    const author = new Author(authorfname, authorlname, authorid);
    
    authors.push(author);
    ui.addAuthor();
    e.preventDefault();
})

//submit genre
document.getElementById('genre-form').addEventListener('submit', function(e){

    const genre = document.getElementById('genre').value;
    const genreid = document.getElementById('genreid').value;
    const genred  = new Genre(genre, genreid);

  genres.push(genred);
  ui.addGenre();
  e.preventDefault();
})


// Book create
document.getElementById('book-creator').addEventListener('submit', function(e) {

  const formData = new FormData(e.target);
  const title = formData.get('title');
  const released = formData.get('released');
  const authorid = formData.get('author');
  const genre = formData.get('genre');
  const book = new Book(title, released, authorid, genre);

e.preventDefault();
booklist.push(book);
ui.addBook(book); 
ui.clearFields();
console.log(book)

})

// Delete book
document.getElementById('table__body').addEventListener("click", function(e) {
 
  ui.deleteBookData(e.target);
  ui.deleteBook(e.target);
  e.preventDefault();
  
})


// Filter book 2.0 

let filterInput = document.getElementById('search__form-input');

filterInput.addEventListener('keyup', (e) => {;
  const searchString = e.target.value;
 const filteredBooks =  booklist.filter(book => {
  return book.title.includes(searchString)
  });
  console.log(filteredBooks)

  // Nie wiem jak zrobić tę metodę
  ui.displayBooks(filteredBooks);
});



//Filter book

/*  function myFunction() {
  let input, filter, tbody, tr, td, i, txtValue ;
  input = document.getElementById('search__form-input');
  filter = input.value.toUpperCase();
  tbody = document.getElementById('table__body');
  tr = tbody.getElementsByTagName('tr');
  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];
    txtValue = td.textContent || td.innerText;
    if(txtValue.toUpperCase().indexOf(filter) > -1)
    {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
} 
*/

