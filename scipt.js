// Simple Registration/Login System with Dashboard in plain JS

// Elements
const container = document.getElementById('app');

let users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser  = JSON.parse(sessionStorage.getItem('currentUser ') || 'null');

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function saveCurrentUser () {
  sessionStorage.setItem('currentUser ', JSON.stringify(currentUser ));
}

function clearCurrentUser () {
  sessionStorage.removeItem('currentUser ');
  currentUser  = null;
}

function renderLogin() {
  container.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <label>Username:<br><input type="text" id="loginUsername" required></label><br><br>
      <label>Password:<br><input type="password" id="loginPassword" required></label><br><br>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#" id="goRegister">Register here</a></p>
    <p id="loginError" style="color:red;"></p>
  `;

  document.getElementById('goRegister').addEventListener('click', e => {
    e.preventDefault();
    renderRegister();
  });

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      currentUser  = user;
      saveCurrentUser ();
      renderDashboard();
    } else {
      document.getElementById('loginError').textContent = 'Invalid username or password';
    }
  });
}

function renderRegister() {
  container.innerHTML = `
    <h2>Register</h2>
    <form id="registerForm">
      <label>Username:<br><input type="text" id="regUsername" required></label><br><br>
      <label>Email:<br><input type="email" id="regEmail" required></label><br><br>
      <label>Password:<br><input type="password" id="regPassword" required></label><br><br>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="#" id="goLogin">Login here</a></p>
    <p id="registerError" style="color:red;"></p>
  `;

  document.getElementById('goLogin').addEventListener('click', e => {
    e.preventDefault();
    renderLogin();
  });

  document.getElementById('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    if (users.find(u => u.username === username)) {
      document.getElementById('registerError').textContent = 'Username already exists';
      return;
    }
    if (users.find(u => u.email === email)) {
      document.getElementById('registerError').textContent = 'Email already registered';
      return;
    }
    if (password.length < 6) {
      document.getElementById('registerError').textContent = 'Password must be at least 6 characters';
      return;
    }

    const newUser  = {
      id: Date.now(),
      username,
      email,
      password,
      registeredAt: new Date().toLocaleDateString()
    };
    users.push(newUser );
    saveUsers();

    currentUser  = newUser ;
    saveCurrentUser ();
    renderDashboard();
  });
}

function renderDashboard() {
  container.innerHTML = `
    <h2>Dashboard</h2>
    <p>Welcome, <strong>${currentUser .username}</strong>!</p>
    <p>Total registered users: <strong>${users.length}</strong></p>
    <p>Your registration date: <strong>${currentUser .registeredAt}</strong></p>
    <h3>Recent Registered Users</h3>
    <ul id="recentUsers"></ul>
    <button id="logoutBtn">Logout</button>
  `;

  const recentUsersList = document.getElementById('recentUsers');
  const recentUsers = users.slice(-5).reverse();
  recentUsersList.innerHTML = recentUsers.map(u => `<li>${u.username} (${u.email}) - Registered: ${u.registeredAt}</li>`).join('');

  document.getElementById('logoutBtn').addEventListener('click', () => {
    clearCurrentUser ();
    renderLogin();
  });
}

// Initial render
if (currentUser ) {
  renderDashboard();
} else {
  renderLogin();
}

