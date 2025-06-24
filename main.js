document.addEventListener("DOMContentLoaded", function () {
  // Initialize click tracking
  if (!localStorage.getItem('bookClicks')) {
    localStorage.setItem('bookClicks', JSON.stringify({}));
  }
  
  fetch("books.json")
    .then(response => response.json())
    .then(books => {
      // Add click counts to books
      const clickData = JSON.parse(localStorage.getItem('bookClicks'));
      books.forEach(book => {
        book.clicks = clickData[book.title] || 0;
      });
      
      // Sort books by popularity
      const sortedByPopularity = [...books].sort((a, b) => b.clicks - a.clicks);
      
      // Categorize books
      const oldClassics = books.filter(book => 
        book.title.toLowerCase().includes("shooting an elephant") || 
        book.title.toLowerCase().includes("in praise of idleness")
      );
      
      const trendingNow = sortedByPopularity.slice(0, 3);
      
      const newStock = books.filter(book => 
        !oldClassics.some(c => c.title === book.title) && 
        !trendingNow.some(t => t.title === book.title)
      );
      
      // Render sections
      renderSection('oldClassics', oldClassics, false);
      renderSection('trendingNow', trendingNow, true);
      renderSection('newStock', newStock, false);
    });

  // Search functionality
  document.getElementById("searchBar").addEventListener("keyup", function () {
    const searchText = this.value.toLowerCase();
    document.querySelectorAll(".book").forEach(book => {
      const title = book.querySelector("h3").textContent.toLowerCase();
      const author = book.querySelector("p").textContent.toLowerCase();
      const genre = book.querySelector(".genre").textContent.toLowerCase();
      
      const match = title.includes(searchText) || 
                   author.includes(searchText) || 
                   genre.includes(searchText);
      
      book.style.display = match ? "block" : "none";
    });
  });
  
  // Render a book section
  function renderSection(containerId, books, isTrending) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    books.forEach((book, index) => {
      const bookCard = createBookCard(book, index, isTrending);
      container.appendChild(bookCard);
    });
  }
  
  // Create book card
  function createBookCard(book, index, isTrending) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    
    // Determine image source
    const imageSource = getBookImage(book);

    // Netflix-style numbering only for trending books
    const numberElement = isTrending ? 
      `<div class="trending-number">${index + 1}</div>` : 
      "";

    bookCard.innerHTML = `
      ${numberElement}
      <div class="book-img-container">
        <img src="${imageSource}" alt="${book.title} Cover" loading="lazy">
      </div>
      <div class="book-content">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <span class="genre">${book.genre}</span>
      </div>
    `;
    
    bookCard.addEventListener("click", () => {
      // Update click count
      const clickData = JSON.parse(localStorage.getItem('bookClicks'));
      clickData[book.title] = (clickData[book.title] || 0) + 1;
      localStorage.setItem('bookClicks', JSON.stringify(clickData));
      
      window.location.href = `read.html?book=${index}`;
    });
    
    return bookCard;
  }
  
  // Helper function to get book image
  function getBookImage(book) {
    const lowerTitle = book.title.toLowerCase();
    
    if (lowerTitle.includes("shooting an elephant")) {
      return "shootinganelephant.png";
    } else if (lowerTitle.includes("in praise of idleness")) {
      return "inpraiseofidleness.png";
    } else if (lowerTitle.includes("i prompted it, i own it— or do i?")) {
      return "kabirmehra1.png";
    } else {
      return "default.png";
    }
  }
});
