document.addEventListener("DOMContentLoaded", function () {
  // Show loading screen for 1.5 seconds
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 1500);

  const urlParams = new URLSearchParams(window.location.search);
  const bookIndex = urlParams.get("book");

  fetch("books.json")
    .then(response => response.json())
    .then(books => {
      const book = books[bookIndex];
      if (!book) {
        document.getElementById("bookContent").textContent = "Book not found.";
        return;
      }

      // Set title and author
      document.getElementById("bookTitle").textContent = book.title;
      document.getElementById("bookAuthor").textContent = "By " + book.author;

      // Retrieve saved bookmark for this book
      let currentPage = localStorage.getItem("bookmark-" + bookIndex);
      currentPage = currentPage !== null ? parseInt(currentPage) : 0;

      const contentDiv = document.getElementById("bookContent");
      const chapterIndicator = document.getElementById("chapterIndicator");
      const progressBar = document.getElementById("progress");

      function updatePage() {
        contentDiv.style.opacity = 0;
        setTimeout(() => {
          contentDiv.textContent = book.content[currentPage];
          chapterIndicator.textContent = "Page " + (currentPage + 1);
          contentDiv.style.opacity = 1;
          progressBar.style.width = ((currentPage + 1) / book.content.length) * 100 + "%";
          localStorage.setItem("bookmark-" + bookIndex, currentPage);
        }, 300);
      }

      updatePage();

      document.getElementById("prevPage").addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          updatePage();
        }
      });

      document.getElementById("nextPage").addEventListener("click", () => {
        if (currentPage < book.content.length - 1) {
          currentPage++;
          updatePage();
        }
      });

      document.getElementById("toggleMode").addEventListener("click", function () {
        if (document.body.classList.contains("dark-mode")) {
          document.body.classList.remove("dark-mode");
          document.body.classList.add("light-mode");
          this.textContent = "🌙 Dark Mode";
          localStorage.setItem("theme", "light");
        } else {
          document.body.classList.remove("light-mode");
          document.body.classList.add("dark-mode");
          this.textContent = "☀ Light Mode";
          localStorage.setItem("theme", "dark");
        }
      });

      // Apply saved theme
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        document.getElementById("toggleMode").textContent = "☀ Light Mode";
      }
    })
    .catch(error => {
      document.getElementById("bookContent").textContent = "Error loading book.";
      console.error(error);
    });
});
