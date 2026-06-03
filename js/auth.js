// ── Dark mode ──
function toggleDark() {
  document.body.classList.toggle('dark');
  const btn = document.querySelector('.dark-toggle');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  document.querySelector('.dark-toggle').textContent = '☀️';
}

// ── Tab switching ──
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0) === (tab === 'login'));
  });
  document.getElementById('panel-login').classList.toggle('active', tab === 'login');
  document.getElementById('panel-register').classList.toggle('active', tab === 'register');
  document.getElementById('panel-title').textContent = tab === 'login' ? 'Welcome back' : 'Create account';
  document.getElementById('panel-subtitle').textContent = tab === 'login'
    ? 'Sign in to your AFS Store account'
    : 'Join thousands of happy shoppers';
}

// ── Toggle password visibility ──
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  btn.textContent = isHidden ? '🙈' : '👁';
}

// ── Password strength ──
function checkStrength(val) {
  const bars = [document.getElementById('s1'), document.getElementById('s2'),
                document.getElementById('s3'), document.getElementById('s4')];
  const label = document.getElementById('strength-label');
  bars.forEach(b => b.style.background = 'var(--border)');

  let score = 0;
  if (val.length >= 8)           score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;

  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  for (let i = 0; i < score; i++) bars[i].style.background = colors[score - 1];
  label.textContent = val.length ? labels[score - 1] || '' : '';
  label.style.color = score > 0 ? colors[score - 1] : 'var(--text-secondary)';
}

// ── Demo credentials ──
const DEMO_USER = { email: 'demo@afsstore.com', password: 'Demo1234' };

// ── Login handler ──
function handleLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) { showToast('Please fill in all fields.', 'error'); return; }
  if (!email.includes('@')) { showToast('Please enter a valid email.', 'error'); return; }
  if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
    showToast('❌ Invalid email or password.', 'error'); return;
  }
  showToast('✅ Signed in successfully! Redirecting…');
  setTimeout(() => window.location.href = 'index.html', 1800);
}

// ── Register handler ──
function handleRegister() {
  const first    = document.getElementById('reg-firstname').value.trim();
  const last     = document.getElementById('reg-lastname').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  if (!first || !last || !email || !password || !confirm) { showToast('Please fill in all fields.', 'error'); return; }
  if (!email.includes('@')) { showToast('Please enter a valid email.', 'error'); return; }
  if (password.length < 8) { showToast('Password must be at least 8 characters.', 'error'); return; }
  if (password !== confirm) { showToast('Passwords do not match.', 'error'); return; }
  showToast(`🎉 Welcome, ${first}! Account created.`);
  setTimeout(() => window.location.href = 'index.html', 1800);
}

// ── Toast ──
function showToast(msg, type = 'success') {
  const t = document.getElementById('auth-toast');
  t.textContent = msg;
  t.style.background = type === 'error' ? 'var(--danger)' : 'var(--success)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}