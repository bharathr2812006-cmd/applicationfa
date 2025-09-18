const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Toggle between login and register forms
showRegisterLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
});

showLoginLink.addEventListener('click', function(e) {
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Handle register submission
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect registration data
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value.trim();

  // Here you can add validation and sending data to backend
  alert(`Registered: \nUsername: ${username}\nEmail: ${email}`);

  // Clear form and switch to login form
  registerForm.reset();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Handle login submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const usernameOrEmail = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // Here you can add validation and sending data to backend
  alert(`Logging in with \nUsername/Email: ${usernameOrEmail}`);

  loginForm.reset();
});