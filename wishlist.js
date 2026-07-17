// wishlist.js — Aura Elite Wishlist System

const Wishlist = (() => {
  const KEY = 'aura_wishlist';

  function getWishlist() {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  }

  function saveWishlist(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function toggle(productId) {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx > -1) {
      list.splice(idx, 1);
      saveWishlist(list);
      return false;
    } else {
      list.push(productId);
      saveWishlist(list);
      return true;
    }
  }

  function isWishlisted(productId) {
    return getWishlist().includes(productId);
  }

  function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn[data-id]').forEach(btn => {
      const id = parseInt(btn.getAttribute('data-id'));
      btn.classList.toggle('active', isWishlisted(id));
      btn.innerHTML = isWishlisted(id) ? '♥' : '♡';
      btn.title = isWishlisted(id) ? 'Remove from Wishlist' : 'Add to Wishlist';
    });
  }

  return { getWishlist, toggle, isWishlisted, updateWishlistButtons };
})();

document.addEventListener('DOMContentLoaded', () => {
  Wishlist.updateWishlistButtons();
});
