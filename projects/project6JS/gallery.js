// Check if user is logged in
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "./logIn.html";
}

// DOM elements
const usernameSpan = document.getElementById("username");
const logoutBtn = document.getElementById("logoutBtn");
const carouselTrack = document.querySelector(".carousel-track");
const prevButton = document.querySelector(".carousel-btn.prev");
const nextButton = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-indicators");

// Images array (replace these with your actual image paths)
const images = [
    "./images/image1.jpg",
    "./images/image2.jpg",
    "./images/image3.jpg",
    "./images/image4.jpg",
    "./images/image5.jpg"
];

let currentIndex = 0;

// Display username
usernameSpan.textContent = currentUser.username;

// Handle logout
logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("currentUser");
    window.location.href = "./logIn.html";
});

// Initialize carousel
function initializeCarousel() {
    // Add images to carousel
    images.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Image ${index + 1}`;
        carouselTrack.appendChild(img);

        // Create dot indicator
        const dot = document.createElement("div");
        dot.className = `carousel-dot ${index === 0 ? "active" : ""}`;
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Set initial position
    updateCarousel();
}

// Update carousel position
function updateCarousel() {
    const slideWidth = carouselTrack.clientWidth;
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update dots
    document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });

    // Update button states
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextButton.style.opacity = currentIndex === images.length - 1 ? "0.5" : "1";
}

// Navigation functions
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

// Event listeners
prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

// Handle keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
});

// Handle window resize
window.addEventListener("resize", updateCarousel);

// Initialize the carousel
initializeCarousel(); 