# Ativar pagamentos reais (Stripe)

O site já vem com o fluxo de compra completo (carrinho → checkout → pagamento
→ confirmação). Falta só ligar a tua conta Stripe — não é preciso escrever
código.

## Passos

1. Cria uma conta em https://dashboard.stripe.com/register (gratuita, só paga
   comissão por transação).
2. No dashboard da Stripe, vai a **Developers → API keys** e copia a
   **Secret key** (começa por `sk_live_...` ou `sk_test_...` para testar
   primeiro).
3. Publica este site na Vercel (vercel.com) — arrasta a pasta ou liga o
   repositório GitHub.
4. No projeto Vercel, vai a **Settings → Environment Variables** e cria:
   - Nome: `STRIPE_SECRET_KEY`
   - Valor: a secret key que copiaste no passo 2
5. Volta a fazer deploy do projeto (a Vercel faz isto automaticamente ao
   guardar a variável, ou clica em "Redeploy").

A partir daqui, o botão "Pagar com cartão" no checkout passa a abrir uma
página de pagamento real da Stripe, e o dinheiro cai diretamente na tua
conta Stripe (ligada ao teu IBAN nas definições da própria Stripe).

## Testar antes de ativar pagamentos reais

Usa a **secret key de teste** (`sk_test_...`) e o cartão de teste
`4242 4242 4242 4242`, com qualquer data futura e qualquer CVC. Nenhum
dinheiro é movimentado em modo de teste.

## Ficheiros relevantes

- `checkout.html` — formulário de entrega e botão de pagamento
- `api/create-checkout-session.js` — cria a sessão de pagamento na Stripe
- `sucesso.html` / `carrinho.html` — páginas de confirmação e de regresso

## Nota sobre hosting

Esta função (`api/create-checkout-session.js`) só funciona em hosts que
suportem funções serverless Node.js, como a Vercel ou a Netlify. Se
publicares o site num host puramente estático (ex: GitHub Pages), o
checkout com cartão não vai funcionar — nesse caso, considera usar
"Payment Links" da Stripe (sem código) em vez desta função.
