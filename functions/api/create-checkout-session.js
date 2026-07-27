// Função do Cloudflare Pages (equivalente à função serverless do Netlify).
// Cria uma Stripe Checkout Session a partir do carrinho enviado pelo browser.
// Requer a variável de ambiente STRIPE_SECRET_KEY configurada no projeto Cloudflare Pages.
//
// Cloudflare Pages Functions usam fetch direto à API da Stripe em vez do
// pacote npm "stripe", para funcionar sem passos de build extra.

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

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: "STRIPE_SECRET_KEY não está configurada. Ver api/README.md." }),
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
