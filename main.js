document.addEventListener("DOMContentLoaded", function () {
  fetch("books.json")
    .then(response => response.json())
    .then(books => {
      const grid = document.getElementById("bookGrid");
      books.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book");
        bookCard.innerHTML = `
          <img src="default.png" alt="Book Cover">
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

  // Simple search filter across all books
  document.getElementById("searchBar").addEventListener("keyup", function () {
    const searchText = this.value.toLowerCase();
    document.querySelectorAll(".book").forEach(book => {
      const title = book.querySelector("h3").textContent.toLowerCase();
      book.style.display = title.includes(searchText) ? "block" : "none";
    });
  });
});
