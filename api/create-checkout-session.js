// Função serverless para Vercel.
// Cria uma Stripe Checkout Session a partir do carrinho enviado pelo browser.
// Requer a variável de ambiente STRIPE_SECRET_KEY configurada no projeto Vercel.

const Stripe = require("stripe");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "método não permitido" });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: "STRIPE_SECRET_KEY não está configurada. Ver api/README.md." });
    return;
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { items, customer } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "carrinho vazio" });
      return;
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.nome },
        unit_amount: Math.round(item.preco * 100)
      },
      quantity: item.qty
    }));

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      customer_email: customer && customer.email,
      shipping_address_collection: { allowed_countries: ["PT", "ES", "FR", "DE"] },
      success_url: `${origin}/sucesso.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/carrinho.html`
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "erro ao criar sessão de checkout" });
  }
};
