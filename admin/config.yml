backend:
  name: github
  repo: SEU-UTILIZADOR/SEU-REPOSITORIO   # <-- troca pelo teu utilizador/repositório do GitHub
  branch: main

media_folder: "assets/uploads"
public_folder: "assets/uploads"

collections:
  - name: "produtos"
    label: "Produtos"
    files:
      - name: "produtos"
        label: "Peças à venda"
        file: "content/products.json"
        fields:
          - name: "items"
            label: "Peças"
            widget: "list"
            label_singular: "Peça"
            summary: "{{nome}} — {{preco}} EUR"
            fields:
              - { name: "id", label: "Identificador único (sem espaços/acentos)", widget: "string" }
              - { name: "nome", label: "Nome da peça", widget: "string" }
              - name: "categoria"
                label: "Categoria"
                widget: "select"
                options:
                  - { label: "Vasos", value: "vasos" }
                  - { label: "Taças", value: "tacas" }
                  - { label: "Canecas", value: "canecas" }
                  - { label: "Pratos", value: "pratos" }
                  - { label: "Chá", value: "cha" }
              - { name: "preco", label: "Preço (EUR)", widget: "number", value_type: "float" }
              - { name: "stock", label: "Quantas disponíveis", widget: "number", value_type: "int", default: 1 }
              - { name: "img", label: "Fotografia", widget: "image" }
              - { name: "altura", label: "Altura (ex: 24 cm)", widget: "string" }
              - { name: "diametro", label: "Diâmetro (ex: 16 cm)", widget: "string" }
              - { name: "vidrado", label: "Vidrado", widget: "string" }
              - { name: "forno", label: "Cozedura (ex: 1260°C — redução)", widget: "string" }
              - { name: "descricao", label: "Descrição", widget: "text" }

  - name: "workshops"
    label: "Workshops"
    files:
      - name: "workshops"
        label: "Lista de workshops"
        file: "content/workshops.json"
        fields:
          - name: "items"
            label: "Workshops"
            widget: "list"
            label_singular: "Workshop"
            summary: "{{nome}} — {{preco}}"
            fields:
              - { name: "nome", label: "Nome do workshop", widget: "string" }
              - { name: "img", label: "Fotografia", widget: "image" }
              - { name: "duracao", label: "Duração / horário", widget: "string" }
              - { name: "preco", label: "Preço", widget: "string" }
              - { name: "desc", label: "Descrição curta", widget: "text" }

  - name: "noticias"
    label: "Anúncios"
    files:
      - name: "noticias"
        label: "Lista de anúncios"
        file: "content/noticias.json"
        fields:
          - name: "items"
            label: "Anúncios"
            widget: "list"
            label_singular: "Anúncio"
            summary: "{{titulo}}"
            fields:
              - { name: "data", label: "Data (ex: 03 Ago 2026)", widget: "string" }
              - name: "pill"
                label: "Etiqueta"
                widget: "select"
                options: ["Novidade", "Workshops", "Atelier", "Promoção"]
              - { name: "titulo", label: "Título", widget: "string" }
              - { name: "texto", label: "Texto", widget: "text" }

  - name: "definicoes"
    label: "Definições do site"
    files:
      - name: "contactos"
        label: "Contactos e textos gerais"
        file: "content/settings.json"
        fields:
          - { name: "email", label: "Email", widget: "string" }
          - { name: "telefone", label: "Telefone", widget: "string" }
          - { name: "morada", label: "Morada / atelier", widget: "string" }
          - { name: "horario", label: "Horário", widget: "string" }
          - { name: "hero_titulo", label: "Título da página inicial (referência, ver README)", widget: "string" }
          - { name: "hero_texto", label: "Texto da página inicial (referência, ver README)", widget: "text" }
