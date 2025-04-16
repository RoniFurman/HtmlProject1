const loginForm = document.querySelector(".loginForm");

// Handle form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.username === username && user.password === password);
    
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "./gallery.html";
    } else {
        alert("Invalid username or password!");
    }
});

// Password visibility toggle
const togglePassword = document.querySelector("#togglePassword");
const passwordInput = document.querySelector("input[name='password']");

togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
}); 