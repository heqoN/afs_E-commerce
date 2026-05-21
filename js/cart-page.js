// ── Cart Page ──
// Renders cart items and order summary on cart.html

function renderCartPage() {
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  const totalEl = document.getElementById('cart-total');

  if (!container) return;

  // If cart is empty show message
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem; color:var(--text-secondary);">
        <p style="font-size:3rem;">🛒</p>
        <p style="font-size:1.1rem; font-weight:600; margin-top:1rem;">Your cart is empty</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:1rem; display:inline-block;">
          Start Shopping
        </a>
      </div>`;
    if (summary) summary.style.display = 'none';
    return;
  }

  // Render each cart item
  container.innerHTML = cart.map(item => `
    <div class="cart-item-card" style="background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:1rem; display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
      <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px; object-fit:cover; border-radius:8px;"/>
      <div style="flex:1;">
        <p style="font-weight:600; font-size:0.95rem;">${item.name}</p>
        <p style="color:var(--text-secondary); font-size:0.8rem;">${item.description}</p>
        <p style="color:var(--primary); font-weight:700; margin-top:0.25rem;">$${item.price}</p>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <!-- Decrease quantity button -->
        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1}); renderCartPage();"
          style="width:28px; height:28px; border:1px solid var(--border); border-radius:6px; background:var(--background); cursor:pointer; font-size:1rem;">−</button>
        <span style="font-weight:600; min-width:20px; text-align:center;">${item.quantity}</span>
        <!-- Increase quantity button -->
        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1}); renderCartPage();"
          style="width:28px; height:28px; border:1px solid var(--border); border-radius:6px; background:var(--background); cursor:pointer; font-size:1rem;">+</button>
      </div>
      <!-- Remove item button -->
      <button onclick="removeFromCart(${item.id}); renderCartPage();"
        style="background:var(--danger); color:white; border:none; padding:0.3rem 0.7rem; border-radius:6px; cursor:pointer; font-size:0.8rem; font-weight:600;">
        Remove
      </button>
    </div>
  `).join('');

  // Show order summary and update total
  if (summary) summary.style.display = 'block';
  if (totalEl) totalEl.textContent = `$${getTotal()}`;

  // Update cart badge
  updateCartCount();
}

// Render cart on page load
renderCartPage();