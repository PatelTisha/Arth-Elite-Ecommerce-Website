// app.js — Aura Elite Main Application Logic

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '<span class="star full">★</span>';
  if (half) stars += '<span class="star half">★</span>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) stars += '<span class="star empty">☆</span>';
  return stars;
}

function createProductCard(product) {
  const wishlisted = Wishlist.isWishlisted(product.id);
  const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-image-wrap">
        ${badge}
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
        </a>
        <button class="wishlist-btn ${wishlisted ? 'active' : ''}" data-id="${product.id}" onclick="handleWishlist(${product.id}, this)" title="${wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
          ${wishlisted ? '♥' : '♡'}
        </button>
        <div class="product-overlay">
          <button class="quick-add-btn" onclick="handleAddToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-rating">
          ${renderStars(product.rating)}
          <span class="review-count">(${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">
            <span>+ Cart</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleAddToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) Cart.addItem(product);
}

function handleWishlist(id, btn) {
  const isNow = Wishlist.toggle(id);
  btn.classList.toggle('active', isNow);
  btn.innerHTML = isNow ? '♥' : '♡';
}

// ── HOMEPAGE ──────────────────────────────────────────────────────────────────
function initHomePage() {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid) return;
  const featured = products.slice(0, 6);
  featuredGrid.innerHTML = featured.map(createProductCard).join('');
  initScrollAnimations();
}

// ── SHOP PAGE ─────────────────────────────────────────────────────────────────
let currentCategory = 'all';
let currentSort = 'default';
let searchQuery = '';

function initShopPage() {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  renderShop();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderShop();
    });
  }

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      renderShop();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => {
      currentSort = e.target.value;
      renderShop();
    });
  }
}

function renderShop() {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  let filtered = [...products];

  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  }

  if (currentSort === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔮</div>
        <h3>No crystals found</h3>
        <p>Try adjusting your search or filter.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(createProductCard).join('');
  initScrollAnimations();
}

// ── PRODUCT PAGE ──────────────────────────────────────────────────────────────
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  if (!product) { window.location.href = 'shop.html'; return; }

  document.title = `${product.name} — Aura Elite`;

  const mainImg = document.getElementById('main-product-img');
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
  }

  document.querySelectorAll('.pd-name').forEach(el => el.textContent = product.name);
  document.querySelectorAll('.pd-price').forEach(el => el.textContent = `₹${product.price.toLocaleString('en-IN')}`);
  document.querySelectorAll('.pd-category').forEach(el => el.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1));
  document.querySelectorAll('.pd-description').forEach(el => el.textContent = product.description);
  document.querySelectorAll('.pd-chakra').forEach(el => el.textContent = product.chakra);
  document.querySelectorAll('.pd-material').forEach(el => el.textContent = product.material);
  document.querySelectorAll('.pd-size').forEach(el => el.textContent = product.size);

  const ratingEl = document.getElementById('pd-rating');
  if (ratingEl) ratingEl.innerHTML = `${renderStars(product.rating)} <span class="pd-reviews">(${product.reviews} reviews)</span>`;

  const benefitsList = document.getElementById('pd-benefits');
  if (benefitsList) {
    benefitsList.innerHTML = product.benefits.map(b => `<li><span class="benefit-icon">✦</span>${b}</li>`).join('');
  }

  const addBtn = document.getElementById('pd-add-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('pd-qty')?.value || 1);
      Cart.addItem(product, qty);
    });
  }

  const wishBtn = document.getElementById('pd-wishlist');
  if (wishBtn) {
    wishBtn.setAttribute('data-id', product.id);
    const isW = Wishlist.isWishlisted(product.id);
    wishBtn.classList.toggle('active', isW);
    wishBtn.innerHTML = isW ? '♥ Wishlisted' : '♡ Wishlist';
    wishBtn.addEventListener('click', () => {
      const isNow = Wishlist.toggle(product.id);
      wishBtn.classList.toggle('active', isNow);
      wishBtn.innerHTML = isNow ? '♥ Wishlisted' : '♡ Wishlist';
    });
  }

  const qtyInput = document.getElementById('pd-qty');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    if (qtyInput && qtyInput.value > 1) qtyInput.value--;
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    if (qtyInput) qtyInput.value++;
  });

  // Similar products
  const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const simGrid = document.getElementById('similar-grid');
  if (simGrid) simGrid.innerHTML = similar.map(createProductCard).join('');
}

// ── CART PAGE ─────────────────────────────────────────────────────────────────
function initCartPage() {
  renderCartPage();
}

function renderCartPage() {
  const container = document.getElementById('cart-items');
  const summaryEl = document.getElementById('cart-summary');
  if (!container) return;

  const cart = Cart.getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Discover our crystal collection and fill it with magic.</p>
        <a href="shop.html" class="btn-primary">Shop Now</a>
      </div>`;
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }

  if (summaryEl) summaryEl.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
      </div>
      <div class="cart-qty-controls">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-display">${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <span class="cart-item-subtotal">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
      <button class="cart-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
    </div>
  `).join('');

  const subtotal = Cart.getTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  document.getElementById('cart-total').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function changeQty(id, delta) {
  const cart = Cart.getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    const newQty = item.qty + delta;
    if (newQty < 1) { Cart.removeItem(id); }
    else { Cart.updateQty(id, newQty); }
    renderCartPage();
  }
}

function removeFromCart(id) {
  Cart.removeItem(id);
  renderCartPage();
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .animate-fade, .feature-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.getAttribute('data-page');
  if (page === 'home') initHomePage();
  else if (page === 'shop') initShopPage();
  else if (page === 'product') initProductPage();
  else if (page === 'cart') initCartPage();
  initScrollAnimations();
});
