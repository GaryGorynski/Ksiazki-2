let authors = [];
let genres = [];
let booklist = [];
let data = 
fetch('https://wolnelektury.pl/api/books/')
.then(response => { 
    return response.json();
}).then(response => { 
          data = response 
          paginatedData = createPaginatedData(data);})
let currentPage = 0;
let perPage = 10;
let paginatedData = [];
let totalPages = 0;
function createPaginatedData(data) {
    const paginated = [];
    totalPages = Math.floor(data.length / perPage);

    for(var i = 0; i < totalPages; i++) {
      const start = i * perPage;
      paginated.push(data.slice(start, start + perPage));
    }

    return paginated;
  }
  
  


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
    displayBooks(filteredBooks) {
      const tableBody = document.getElementById('table__body')
      const row = document.createElement('tr'); 
      const filteredTable = filteredBooks.map((book, bookAuthor, bookGenre) => {
        return row.innerHTML = `
        <td data-book-title="${book.title}" id="title">${book.title}</td>
        <td>${bookAuthor.authorfname}</td>
        <td>${bookAuthor.authorlname}</td>
        <td>${book.bookid}</td>
        <td>${book.released}</td>
        <td>${book.authorid}</td>
        <td>${book.genre}</td>
        <td>${bookGenre.genreid}</td>
        <td><button value="delete" class="delete" id="delete" data-book-id="${book.bookid}">X</button></td>
        </tr>
        `
      });

      tableBody.innerHTML = filteredTable;
      tableBody.appendChild(row);
      
      
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
 fetchBooks() {
      fetch('https://wolnelektury.pl/api/books')
      .then(response => {
        return response.json();
      })
      .then(data => {     
        const html = data.map(book => {
          return `
          <li id="bookie"><a href="#" data-bs-toggle="modal" data-bs-target='#myBooksModal' data-book-slug="${book.slug}">${book.title}</a></li>
          `
        }).join('');
      
        document.getElementById('booksOl').innerHTML = html;
        })
      .catch(error => console.log(error))
    }
 fetchCollections() {
      fetch('https://wolnelektury.pl/api/collections')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const html = data.map(collection => {
          return `
          <li data-book-collection=${collection.title}><a href="${collection.url}" data-bs-target='#myModal'>${collection.title}</a></li>
          `
        }).join('');
        document.getElementById('collectionsOl').innerHTML = html;
      })
      .catch(error => console.log(error))
    }

    fetchGenres() {
      fetch('https://wolnelektury.pl/api/genres')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const html = data.map(genre => {
    
          return `
          <li data-book-genre=${genre.name}>${genre.name}</li>
          `
        }).join('');
        document.getElementById('genresOl').innerHTML = html;
      })
      .catch(error => console.log(error))
    }

  fetchAuthors() {
      fetch('https://wolnelektury.pl/api/authors')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const html = data.map(author => {
    
          return `
          <li data-book-author=${author.name}><a href="#" data-author-slug="${author.slug}" data-bs-toggle="modal" data-bs-target='#myAuthorModal'>${author.name}</a></li>
          `
        }).join('');
        document.getElementById('authorsOl').innerHTML = html;
      })
      .catch(error => console.log(error))
    }
    showBooks(html) {
     
      let htmls = html.map(book => {
        return `<li id="bookie"><a href="#" data-bs-toggle="modal"  data-bs-target="#myBooksModal" data-book-slug="${book.slug}">${book.title}</a></<li>`
      })
      document.getElementById('booksOl').innerHTML = htmls
    }

    setBtns() {

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

  
  ui.displayBooks(filteredBooks);
  e.preventDefault();
});

document.getElementById('books-tab').addEventListener('click', function(){ 
document.getElementById('last-page').innerHTML = paginatedData.length-1;

ui.showBooks(paginatedData[0]);
 });

 document.getElementById('first-page').addEventListener('click', function() {
 currentPage = 0;
 ui.showBooks(paginatedData[0])
 });

 document.getElementById('num2').addEventListener('click', function() {
  currentPage = 1;
  ui.showBooks(paginatedData[1])
});

document.getElementById('num3').addEventListener('click', function() {
  currentPage = 2;
  ui.showBooks(paginatedData[2])
});

document.getElementById('num4').addEventListener('click', function() {
  currentPage = 3;
  ui.showBooks(paginatedData[3])
});

document.getElementById('num5').addEventListener('click', function() {
  currentPage = 4;
  ui.showBooks(paginatedData[4])
});

 document.getElementById('last-page').addEventListener('click',function(){
   currentPage = paginatedData.length-1

ui.showBooks(paginatedData[paginatedData.length-1])
 })


 document.getElementById('prev-page').addEventListener('click',function(){
  if(currentPage != 0)
  currentPage = currentPage -1
 
ui.showBooks(paginatedData[currentPage])
 })
 document.getElementById('next-page').addEventListener('click',function(){
  if(currentPage != paginatedData.length-1)
  currentPage = currentPage +1
 
ui.showBooks(paginatedData[currentPage])
 })


document.getElementById('booksOl').addEventListener('click',function(e){
 // let loader = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
 // document.getElementById('bookTitle').innerHTML = loader;
  let bookClicked= e.target
  let bookSlug = bookClicked.getAttribute('data-book-slug');
  fetch(`https://wolnelektury.pl/api/books/${bookSlug}`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if(data.audio_length !== ""){ 
      document.getElementById('modalAudio').href = data.media[0].url
      document.getElementById('modalAudioType').innerHTML = "Typ pliku: " + data.media[0].type
      document.getElementById('modalAudioSpeaker').innerHTML = "Czyta: " + data.media[0].artist
      document.getElementById('modalAudioLength').innerHTML = "Długość trwania: " + data.audio_length
    } else {
      document.getElementById('modalAudio').href = "#"
      document.getElementById('modalAudioType').innerHTML = "Brak audiobooka"
      document.getElementById('modalAudioSpeaker').innerHTML = ""
      document.getElementById('modalAudioLength').innerHTML = ""
      
    }
    document.getElementById('bookTitle').innerHTML = data.title;
    document.getElementById('modalBookAuth').innerHTML = 'Autor: ' + data.authors[0].name;
    document.getElementById('modalBookGenre').innerHTML = 'Gatunki: ' + data.genres[0].name
    document.getElementById('modalBookLang').innerHTML = 'Język:' + ' ' + data.language;
    document.getElementById('modalBookImg').src = data.cover;   
  })
})


document.getElementById('authors-tab').addEventListener('click',function(e){
  //let loader = `<div class="lds-ring" style="margin-left: 650px"><div></div><div></div><div></div><div></div></div>`
  //document.getElementById('authorsOl').innerHTML = loader;
  ui.fetchAuthors();
})


document.getElementById('authors').addEventListener('click', function(e) {
  let authorClicked = e.target
  let authorSlug = authorClicked.getAttribute('data-author-slug');
  let loader = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
  document.getElementById('modalAuthor').innerHTML = loader;
  fetch(`https://wolnelektury.pl/api/authors/${authorSlug}`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    document.getElementById('modalAuthor').innerHTML = data.name
    document.getElementById('modalAuthorDesc').innerHTML = data.description
  })
  })


  document.getElementById('genres-tab').addEventListener('click',function() {
    ui.fetchGenres()
     })


  document.getElementById('collections-tab').addEventListener('click',function() {
    let loader = `<div class="lds-ring" style="margin-left: 650px"><div></div><div></div><div></div><div></div></div>`
  document.getElementById('collectionsOl').innerHTML = loader;
 ui.fetchCollections()
  })
  










