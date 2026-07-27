// Worker do Cloudflare. Serve o site estático (via ASSETS) e trata só
// o pedido de checkout Stripe em /api/create-checkout-session — o resto
// dos pedidos nunca chega aqui, porque o wrangler.jsonc só encaminha
// /api/* para este script (run_worker_first).

function appendParam(params, key, value) {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    value.forEach((v, i) => appendParam(params, `${key}[${i}]`, v));
  } else if (typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => appendParam(params, `${key}[${k}]`, v));
  } else {
    params.append(key, value);
  }
}

async function handleCheckout(request, env) {
  if (!env.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: "STRIPE_SECRET_KEY não está configurada." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { items, customer } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "carrinho vazio" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    const origin = request.headers.get("origin") || new URL(request.url).origin;

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("payment_method_types[0]", "card");
    if (customer && customer.email) params.append("customer_email", customer.email);
    appendParam(params, "shipping_address_collection", { allowed_countries: ["PT", "ES", "FR", "DE"] });
    params.append("success_url", `${origin}/sucesso.html?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}/carrinho.html`);

    items.forEach((item, i) => {
      appendParam(params, `line_items[${i}]`, {
        price_data: {
          currency: "eur",
          product_data: { name: item.nome },
          unit_amount: Math.round(item.preco * 100)
        },
        quantity: item.qty
      });
    });

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error(session);
      return new Response(JSON.stringify({ error: "erro ao criar sessão de checkout" }), {
        status: 500, headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200, headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "erro ao criar sessão de checkout" }), {
      status: 500, headers: { "Content-Type": "application/json" }
    });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/create-checkout-session" && request.method === "POST") {
      return handleCheckout(request, env);
    }

    // Qualquer outro pedido a /api/* que não reconheçamos.
    if (url.pathname.startsWith("/api/")) {
      return new Response("Not found", { status: 404 });
    }

    // Segurança extra: serve os ficheiros estáticos normalmente.
    return env.ASSETS.fetch(request);
  }
};
