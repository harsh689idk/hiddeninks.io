// Mobile menu toggle functionality
    document.addEventListener("DOMContentLoaded", function () {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('nav');
      
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.innerHTML = nav.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
      });
      
      // Close menu when clicking on a link
      document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
      });

      // Book loading and search functionality
      fetch("books.json")
        .then(response => response.json())
        .then(books => {
          const grid = document.getElementById("bookGrid");
          books.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book");
            
            // Determine image source based on book title
            let imageSource;
            const lowerTitle = book.title.toLowerCase();
            
            if (lowerTitle.includes("shooting an elephant")) {
              imageSource = "shootinganelephant.png";
            } else if (lowerTitle.includes("in praise of idleness")) {
              imageSource = "inpraiseofidleness.png";  // New image for this book
            } else if (lowerTitle.includes("i prompted it, i own it— or do i?")) {
              imageSource = "kabirmehra1.png";  // New image for this book
            } else if (lowerTitle.includes("notes from underground")) {
              imageSource = "notesfromunderground.png";  // New image for this book
            } else {
              imageSource = "default.png";
            }

            bookCard.innerHTML = `
              <img src="${imageSource}" alt="${book.title} Cover">
              <h3>${book.title}</h3>
              <p>${book.author}</p>
              <span class="genre">${book.genre}</span>
            `;
            
            bookCard.addEventListener("click", () => {
              window.location.href = `read.html?book=${index}`;
            });
            grid.appendChild(bookCard);
          });
        });

      // Search filter
      document.getElementById("searchBar").addEventListener("keyup", function () {
        const searchText = this.value.toLowerCase();
        document.querySelectorAll(".book").forEach(book => {
          const title = book.querySelector("h3").textContent.toLowerCase();
          book.style.display = title.includes(searchText) ? "block" : "none";
        });
      });
    });
