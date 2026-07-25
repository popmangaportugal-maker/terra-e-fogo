// Carrinho — persistido em localStorage do lado do cliente.
const CART_KEY = "terrafogo_cart";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty = 1) {
  const cart = readCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  writeCart(cart);
  showToast("Adicionado ao carrinho");
}

function removeFromCart(id) {
  writeCart(readCart().filter(i => i.id !== id));
}

function setQty(id, qty) {
  const cart = readCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  if (qty <= 0) {
    writeCart(cart.filter(i => i.id !== id));
  } else {
    item.qty = qty;
    writeCart(cart);
  }
}

function cartCount() {
  return readCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartLines() {
  return readCart()
    .map(i => ({ ...i, product: getProduct(i.id) }))
    .filter(l => l.product);
}

function cartTotal() {
  return cartLines().reduce((sum, l) => sum + l.product.preco * l.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "inline" : "none";
  });
}

function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
