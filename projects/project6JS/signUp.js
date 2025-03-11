// Form elements
const signUpForm = document.querySelector(".signUpForm");
const togglePassword = document.querySelector("#togglePassword");
const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");
const passwordInput = document.querySelector("input[name='password']");
const confirmPasswordInput = document.querySelector("input[name='confirmPassword']");

// Toggle password visibility
function togglePasswordVisibility(toggleButton, inputField) {
    toggleButton.addEventListener("click", function () {
        const type = inputField.getAttribute("type") === "password" ? "text" : "password";
        inputField.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });
}

togglePasswordVisibility(togglePassword, passwordInput);
togglePasswordVisibility(toggleConfirmPassword, confirmPasswordInput);

// Handle signup form submission
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = signUpForm.username.value;
    const password = signUpForm.password.value;
    const confirmPassword = signUpForm.confirmPassword.value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get current users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    // Create new user
    const newUser = {
        username,
        password,
        images: [] // Initialize empty images array for gallery
    };

    // Add user to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    
    // Store current user in session storage and redirect
    sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "./gallery.html";
}); 