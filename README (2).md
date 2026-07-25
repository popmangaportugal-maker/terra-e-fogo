<!DOCTYPE html>
<html lang="pt-PT">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contacto — Terra & Fogo</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header class="site-header">
  <div class="wrap">
    <a href="index.html" class="logo"><span class="ring"></span> Terra &amp; Fogo</a>
    <nav class="main-nav">
      <a href="loja.html">Loja</a>
      <a href="workshops.html">Workshops</a>
      <a href="videos.html">Vídeos</a>
      <a href="noticias.html">Anúncios</a>
      <a href="contacto.html" class="active">Contacto</a>
    </nav>
    <div class="header-actions">
      <a href="carrinho.html" class="cart-link">Carrinho <span data-cart-count style="display:none">0</span></a>
      <button class="menu-toggle" aria-label="Abrir menu">☰</button>
    </div>
  </div>
</header>

<section>
  <div class="wrap two-col" style="align-items:flex-start;">
    <div>
      <span class="eyebrow">Fale connosco</span>
      <h1 style="font-size:clamp(32px,4vw,46px); margin:12px 0 20px;">Contacto</h1>
      <p class="lede" style="margin-bottom:34px;">Para marcar um workshop, perguntar por uma peça específica ou uma encomenda personalizada.</p>
      <form id="contact-form" style="display:flex; flex-direction:column; gap:16px; max-width:440px;">
        <input required name="nome" placeholder="Nome" class="contact-input">
        <input required type="email" name="email" placeholder="Email" class="contact-input">
        <textarea required name="mensagem" placeholder="Mensagem" rows="5" class="contact-input"></textarea>
        <button type="submit" class="btn btn-primary">Enviar mensagem</button>
        <p id="contact-note" style="font-size:13px; color:var(--biscuit-dim); font-family:var(--mono);"></p>
      </form>
    </div>
    <div>
      <div class="ring-divider">outras formas de contacto</div>
      <div style="display:flex; flex-direction:column; gap:20px; font-family:var(--mono); font-size:14px;">
        <div><span class="eyebrow">Email</span><br><a href="mailto:" id="info-email">a carregar…</a></div>
        <div><span class="eyebrow">Telefone</span><br><span style="color:var(--biscuit-dim);" id="info-tel">a carregar…</span></div>
        <div><span class="eyebrow">Atelier</span><br><span style="color:var(--biscuit-dim);" id="info-morada">a carregar…</span></div>
        <div><span class="eyebrow">Horário</span><br><span style="color:var(--biscuit-dim);" id="info-horario">a carregar…</span></div>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-bottom">
      <span>© <span data-year></span> Terra &amp; Fogo</span>
    </div>
  </div>
</footer>

<style>
  .contact-input {
    background: var(--tenmoku-2); border: 1px solid var(--tenmoku-3); color: var(--biscuit);
    padding: 13px 16px; border-radius: 3px; font-family: var(--sans); font-size: 15px; resize: vertical;
  }
  .contact-input:focus { outline: none; border-color: var(--celadao); }
</style>

<script src="js/cart.js"></script>
<script src="js/main.js"></script>
<script>
  fetch("content/settings.json").then(r => r.json()).then(s => {
    const emailEl = document.getElementById("info-email");
    emailEl.textContent = s.email;
    emailEl.href = "mailto:" + s.email;
    document.getElementById("info-tel").textContent = s.telefone;
    document.getElementById("info-morada").textContent = s.morada;
    document.getElementById("info-horario").textContent = s.horario;
  });

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contact-note").textContent =
      "Este formulário ainda não está ligado a um serviço de email — ver nota no README para ativar (ex: Formspree, EmailJS).";
  });
</script>
</body>
</html>
