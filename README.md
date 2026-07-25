# Terra & Fogo — site da loja de cerâmica

Site completo: loja com carrinho e pagamento, workshops, vídeos, anúncios,
e um painel de administração para editares tudo sem tocar em código.

## Estrutura

```
index.html, loja.html, produto.html, carrinho.html,
checkout.html, sucesso.html, workshops.html, videos.html,
noticias.html, contacto.html    → as páginas do site

content/
  products.json      → as peças à venda (editar via /admin)
  workshops.json      → os workshops (editar via /admin)
  noticias.json       → os anúncios (editar via /admin)
  settings.json        → contactos e alguns textos (editar via /admin)

admin/
  index.html            → o painel de administração (CMS)
  config.yml             → configuração do painel (repositório, campos)

css/style.css          → todo o estilo do site
js/products.js          → carrega content/products.json
js/cart.js              → lógica do carrinho
js/main.js               → menu mobile, pequenos detalhes
assets/                  → imagens (troca os placeholders por fotos reais)
api/                      → função serverless do pagamento Stripe
```

## Publicar o site (com painel de administração)

Ao contrário da primeira versão, para teres o painel `/admin` a funcionar
**precisas de publicar via GitHub**, não por drag-and-drop. Não é
complicado — segue estes passos uma única vez:

### 1. Criar conta no GitHub e um repositório
1. Cria conta em github.com (gratuito)
2. Cria um novo repositório (botão verde "New") — pode ser privado ou
   público, nome à tua escolha (ex: `terra-e-fogo`)
3. Faz upload de todos os ficheiros desta pasta para esse repositório
   (na página do repositório: "Add file" → "Upload files", arrasta tudo
   para lá, e confirma o commit)

### 2. Ligar o repositório ao Netlify
1. No dashboard da Netlify, "Add new site" → "Import an existing project"
2. Escolhe "Deploy with GitHub" e autoriza o acesso
3. Seleciona o repositório que acabaste de criar
4. Deixa as definições de build em branco (não é preciso build command
   nem publish directory — o site já vem pronto) e clica em "Deploy"

### 3. Ativar o login do painel de administração
1. No projeto Netlify, vai a **Site configuration → Access & security → OAuth**
2. Segue o guia oficial da Netlify para registar uma aplicação OAuth no
   GitHub e ligá-la ali: https://docs.netlify.com/security/secure-access-to-sites/oauth-provider-tokens/
   (é copiar e colar dois códigos — Client ID e Client Secret — que o
   GitHub te dá)

### 4. Apontar o painel para o teu repositório
1. Abre `admin/config.yml`
2. Troca a linha `repo: SEU-UTILIZADOR/SEU-REPOSITORIO` pelo teu
   utilizador e nome do repositório reais (ex: `repo: dario123/terra-e-fogo`)
3. Guarda e envia essa alteração para o GitHub (novo commit)

A partir daqui, o site fica acessível em `nome-aleatorio.netlify.app`, e o
painel de administração em `nome-aleatorio.netlify.app/admin` — basta
entrares com a tua conta GitHub.

## Usar o painel de administração

Em `/admin` vais encontrar quatro secções:

- **Produtos** — adiciona, edita ou remove peças à venda: nome, categoria,
  preço, stock, fotografia (upload direto), dimensões, vidrado, cozedura
  e descrição
- **Workshops** — os workshops disponíveis
- **Anúncios** — as novidades que aparecem na página de Anúncios e na
  homepage
- **Definições do site** — email, telefone, morada e horário que aparecem
  no rodapé e na página de Contacto

Cada alteração que gravares no painel cria um commit no GitHub, e a
Netlify volta a publicar o site automaticamente — normalmente leva menos
de um minuto a aparecer online.

## Ativar pagamentos reais (Stripe)

Ver `api/README.md` — resumindo: cria conta grátis na Stripe, copia a
chave secreta, cola-a nas variáveis de ambiente do projeto Netlify.

## Substituir os placeholders por conteúdo real

- **Fotos**: podes agora fazer upload diretamente através do painel
  `/admin` ao editares cada produto/workshop — não precisas de mexer em
  ficheiros.
- **Vídeos da página "Vídeos"**: por agora ainda é preciso editar
  `videos.html` diretamente e trocar o `src=""` de cada `<video>` pelo
  caminho do teu ficheiro.
- **Título e texto principal da homepage** (o H1 grande com "Peças que
  ainda trazem a marca do torno"): por ter formatação especial (quebras
  de linha, palavra em itálico), continua a editar-se diretamente em
  `index.html` por agora.

## Formulário de contacto

Ainda só mostra uma mensagem — não envia email de verdade. Para ativar
sem precisar de um backend próprio: Formspree (formspree.io) ou EmailJS
(emailjs.com), ambos gratuitos para poucos envios por mês.

## Ver o site localmente antes de publicar

```
python3 -m http.server 8000
```
Depois abre `http://localhost:8000`. (O painel `/admin` só funciona depois
de publicado no Netlify e ligado ao GitHub — localmente não vais conseguir
entrar nele, o que é normal.)
