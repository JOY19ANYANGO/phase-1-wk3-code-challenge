

function fetchAndRenderMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
      .then((res) => res.json())
      .then((movie) => {
        let available = movie.capacity - movie.tickets_sold;
        const htmlmarkup = `<div class="moviedata">
                             <p>${movie.id}</p>
                             <p>Title:${movie.title}</p>
                             <p>Runtime:${movie.runtime}</p>
                             <p>Capacity:${movie.capacity}</p>
                             <p>Showtime:${movie.showtime}</p>
                             <p id="sold">Tickets sold:${movie.tickets_sold}<p>
                             <p>Description:${movie.description}</p>
                             <p id="tickets">Available tickets:${available}</p>
                             <button id="buy">Buy Ticket</button><br><br>
                             </div>
                             <img src=${movie.poster}>`;
  
        document.getElementById("movie-details").innerHTML = htmlmarkup;
  
        const button = document.getElementById("buy");
        button.addEventListener("click", function () {
          buyTickets(movie);
        });
      });
  }
  
  // Function to handle movie name click
  function handleMovieNameClick(movieId) {
    // Clear movie details first
    document.getElementById("movie-details").innerHTML = '';
  
    // Fetch and render movie details
    fetchAndRenderMovieDetails(movieId);
  }
  
  // Fetch and render details for the first movie when the page loads
  fetchAndRenderMovieDetails(1);
  
  // Fetch movie list and create clickable movie names
  fetch("http://localhost:3000/films")
    .then((res) => res.json())
    .then((data) => {
      const filmsList = document.getElementById("films");
      data.forEach((movie) => {
        const markup = `<li class="film item" onclick="handleMovieNameClick(${movie.id})">${movie.title}</li>`;
        filmsList.insertAdjacentHTML("beforeend", markup);
      });
    });
  
  // Function to handle buying tickets
  function buyTickets(movie) {
    const available = movie.capacity - movie.tickets_sold;
  
    if (available > 0) {
      movie.tickets_sold++;
      let sold = document.getElementById("sold");
      sold.textContent = `Tickets sold: ${movie.tickets_sold}`;
       newAvailable=movie.capacity - movie.tickets_sold
      let result = document.getElementById("tickets");
      result.textContent = `Available tickets: ${newAvailable}`;
    } else {
      const button = document.getElementById("buy");
      button.textContent = "Sold out";
      
    }
  }