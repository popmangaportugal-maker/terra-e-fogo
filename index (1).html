// Catálogo de produtos — os dados vivem em content/products.json,
// editável através do painel em /admin (CMS). Este ficheiro só
// trata de carregar esses dados e disponibilizá-los ao resto do site.

let PRODUCTS = [];
let _productsLoaded = null;

function loadProducts() {
  if (!_productsLoaded) {
    _productsLoaded = fetch("content/products.json")
      .then(res => res.json())
      .then(data => { PRODUCTS = data.items || []; return PRODUCTS; })
      .catch(err => { console.error("Erro a carregar produtos:", err); PRODUCTS = []; return PRODUCTS; });
  }
  return _productsLoaded;
}

function formatEUR(v) {
  return v.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
