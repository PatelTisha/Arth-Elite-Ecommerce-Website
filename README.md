# ✨ Arth Elite — Premium Crystal Bracelet eCommerce Website

**Tagline:** Feel the Aura ✨  
**Niche:** Luxury Crystal Bracelets (Healing · Wealth · Love · Protection)

---

## 📁 File Structure

```
arth-elite/
├── index.html          → Homepage (Hero, Featured Products, Categories, Testimonials)
├── shop.html           → Full Shop (Search, Filter, Sort, All 15 Products)
├── product.html        → Single Product View (Gallery, Details, Similar Products)
├── cart.html           → Shopping Cart (Qty Control, Summary, Totals)
├── checkout.html       → Checkout Form (Shipping, Razorpay Button, Validation)
├── login.html          → Auth Page (Sign In + Create Account, Glassmorphism UI)
├── css/
│   └── style.css       → Complete Stylesheet (1000+ lines, fully responsive)
├── js/
│   ├── products.js     → 15 Product Objects (id, name, price, image, category…)
│   ├── app.js          → Render Products, Search, Filter, Sort, Page Logic
│   ├── cart.js         → Add/Remove/Update Cart via localStorage
│   ├── wishlist.js     → Toggle Wishlist State via localStorage
│   └── auth.js         → Register / Login / Logout / Navbar Auth State
└── images/
    ├── logo.png        → Arth Elite Brand Logo (height: 75px)
    ├── p1.jpg          → Mother of Pearl Bracelet
    ├── p2.jpg          → Citrine Bracelet
    ├── p3.jpg          → Labradorite Bracelet
    ├── p4.jpg          → Bloodstone Bracelet
    ├── p5.jpg          → Moonstone Bracelet
    ├── p6.jpg          → Green Aventurine Bracelet
    ├── p7.jpg          → Love & Harmony Bracelet
    ├── p8.jpg          → Success & Wealth Bracelet
    ├── p9.jpg          → Tiger Eye Bracelet
    ├── p10.jpg         → Red Jasper Bracelet
    ├── p11.jpg         → Amethyst Bracelet
    ├── p12.jpg         → Turquoise Bracelet
    ├── p13.jpg         → Black Tourmaline Bracelet
    ├── p14.jpg         → Smokey Quartz Bracelet
    └── p15.jpg         → Rhodonite Bracelet
```

---

## 🚀 Setup Instructions

1. **Add Your Images** — Place your product images inside the `images/` folder using the exact filenames listed above (p1.jpg through p15.jpg, and logo.png).

2. **Open Locally** — Open `index.html` in any modern browser. No build step, no backend required.

3. **Live Server (Recommended)** — Use VS Code Live Server extension or any local HTTP server for the best experience.

---

## ✅ Features Checklist

| Feature | Status |
|---|---|
| Glassmorphism navbar with logo (75px height) | ✅ |
| Dynamic product rendering (no repeated HTML) | ✅ |
| Search bar with live filtering | ✅ |
| Category filters (All / Healing / Wealth / Love / Protection) | ✅ |
| Sort by price (Low→High, High→Low) and rating | ✅ |
| Cart with quantity controls + localStorage persistence | ✅ |
| Live cart count in navbar | ✅ |
| Wishlist toggle with localStorage | ✅ |
| User registration with validation | ✅ |
| User login with error handling | ✅ |
| Logout clears session | ✅ |
| Navbar updates on auth state change | ✅ |
| Checkout redirects to login if unauthenticated | ✅ |
| Checkout form validation (all fields) | ✅ |
| Dummy Razorpay payment button with success modal | ✅ |
| Product detail page with similar products | ✅ |
| Smooth hover animations + image zoom | ✅ |
| Scroll-triggered fade-in animations | ✅ |
| Cart toast notification | ✅ |
| Fully responsive (mobile, tablet, desktop) | ✅ |
| ₹ symbol + Indian number formatting | ✅ |
| Free shipping logic (above ₹999) | ✅ |
| Footer with links | ✅ |

---

## 🎨 Design System

| Variable | Value |
|---|---|
| Background | `#FAF9F6` |
| Lavender | `#E6D9FF` |
| Pink | `#F8D7DA` |
| Mint | `#DFF5E1` |
| Gold Accent | `#D4AF37` |
| Text Dark | `#333333` |
| Font | Poppins (Google Fonts) |
| Border Radius | 20px+ |

---

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+ — Full 4-column grid
- **Tablet:** 768px–1024px — 2-column grid
- **Mobile:** <768px — Single column, hamburger nav

---

*Built with pure HTML, CSS & JavaScript. No frameworks. No dependencies.*
