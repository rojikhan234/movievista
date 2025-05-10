// 1. Arrow Navigation for Movie Lists
// Select all arrows and movie lists
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

// Add click event listeners to each arrow
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length; // Number of items in the list
  let clickCounter = 0;

  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270); // Calculate the number of items visible
    clickCounter++;
    // Check if there are more items to scroll
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`; // Move the list to the left
    } else {
      movieLists[i].style.transform = "translateX(0)"; // Reset to the start
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270)); // Log the ratio for debugging
});

// 2. Polling Icon Navigation
// Select the polling icon in the sidebar
const pollingIcon = document.querySelector(".fa-square-poll-vertical");

// Add click event listener to navigate to the polling page
pollingIcon.addEventListener("click", () => {
  alert("Navigating to the polling page...");
  window.location.href = "polling.html"; // Redirect to polling.html
});

// 3. Dynamic Movie Voting System
// Select the container where the movie list will be rendered for polling
const movieListContainer = document.querySelector(".movie-list");

// Fetch and render movies dynamically from a backend API
fetch("http://localhost:5000/api/movies") // Replace with your backend API endpoint
  .then((response) => response.json())
  .then((movies) => {
    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.classList.add("movie-list-item");
      movieItem.innerHTML = `
        <img class="movie-list-item-img" src="${movie.image}" alt="${movie.name}">
        <span class="movie-list-item-title">${movie.name}</span>
        <p class="movie-list-item-desc">${movie.description}</p>
        <button class="movie-list-item-button" onclick="vote(${movie.id})">Vote</button>
      `;
      movieListContainer.appendChild(movieItem);
    });
  })
  .catch((error) => console.error("Error fetching movies:", error));

// Function to handle voting
function vote(movieId) {
  fetch(`http://localhost:5000/api/vote/${movieId}`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message); // Show a success message
    })
    .catch((error) => console.error("Error voting:", error));
}

// 4. Dark Mode Toggle
// Select the toggle button and the ball
const toggle = document.querySelector(".toggle");
const ball = document.querySelector(".toggle-ball");

// Add event listener for toggling dark mode
toggle.addEventListener("click", () => {
  const isDarkMode = ball.classList.toggle("move"); // Move the ball
  document.body.classList.toggle("dark-mode", isDarkMode); // Apply dark mode
  document.body.classList.toggle("light-mode", !isDarkMode); // Remove light mode
});

// 5. Profile Menu Toggle
// Select the profile container and menu
const profileContainer = document.querySelector(".profile-container");
const profileMenu = document.querySelector(".profile-menu");

// Add event listener to toggle the profile menu
profileContainer.addEventListener("click", () => {
  profileMenu.classList.toggle("show");
});

// 6. Sound Toggle for Video
// Select the video element and the sound icon
const video = document.getElementById("background-video");
const soundIcon = document.getElementById("sound-icon");

// Add event listener for toggling sound
soundIcon.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false; // Unmute the video
    soundIcon.classList.remove("fa-volume-mute");
    soundIcon.classList.add("fa-volume-up");
  } else {
    video.muted = true; // Mute the video
    soundIcon.classList.remove("fa-volume-up");
    soundIcon.classList.add("fa-volume-mute");
  }
});

// Ensure the video plays on page load
video.play().catch((error) => {
  console.error("Error playing video:", error);
});

// 7. Hide Element on Click (General Utility)
// Add event listener to hide an element when clicked
Element.addEventListener("click", () => {
  Element.style.display = "none";
});
// Function to handle redirection to the movie details page
function redirectToMovie(movieTitle) {
    // Replace spaces in the movie title with dashes (-) to create a clean URL parameter
    const formattedTitle = movieTitle.replace(/\s+/g, '-');
    // Redirect to movie.html with the movie title as a query parameter
    window.location.href = `movie.html?title=${formattedTitle}`;
}