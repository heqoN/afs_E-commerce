// ── App Entry Point ──
// Handles product rendering, search and category filtering

// Render a list of products into the product grid
function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  // Update product count
  updateProductCount(list);

  // If no products match, show a message
  if (list.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-secondary); grid-column:1/-1;">No products found.</p>';
    return;
  }

  // Generate product card HTML for each product
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" />
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price}</span>
          <button class="btn-add" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Update product count display based on filtered results
function updateProductCount(list) {
  const countEl = document.getElementById('product-count');
  if (countEl) countEl.textContent = `${list.length} product(s) found`;
}

// Filter products based on search input and selected category
function filterProducts() {
  // Get current search term (lowercase for case-insensitive match)
  const search = document.getElementById('search-input')?.value.toLowerCase() || '';

  // Get selected category
  const category = document.getElementById('category-filter')?.value || 'all';

  // Filter products array based on both criteria
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
    const matchCategory = category === 'all' || p.category === category;
    return matchSearch && matchCategory;
  });

  // Re-render with filtered results
  renderProducts(filtered);
}

// Listen for search input changes and re-filter
document.getElementById('search-input')?.addEventListener('input', filterProducts);

// Listen for category dropdown changes and re-filter
document.getElementById('category-filter')?.addEventListener('change', filterProducts);

// Initial render — show all products on page load
renderProducts(products);

// Update cart badge on page load
updateCartCount();

// Sort products by price (low to high)
function sortProducts(order) {
  const sorted = [...products].sort((a, b) => {
    return order === 'asc' ? a.price - b.price : b.price - a.price;
  });
  renderProducts(sorted);
}

// Listen for sort dropdown changes
document.getElementById('sort-select')?.addEventListener('change', function () {
  sortProducts(this.value);
});

// Highlight active nav link based on current page
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});