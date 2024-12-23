const aside = document.querySelector("aside");

// Function to check if the user has scrolled 30% of the viewport height
function checkScroll() {
  const scrollPosition = window.scrollY; // The current scroll position

  const screenHeight = window.innerHeight; // The height of the viewport
  const triggerPoint = screenHeight * 0.1; // 30% of the viewport height

  if (scrollPosition >= triggerPoint) {
    // Add the visible class to the section
    aside.classList.add("visible");
  } else {
    aside.classList.remove("visible");
  }
}

// Listen for the scroll event
window.addEventListener("scroll", checkScroll);


