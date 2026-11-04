# Ed&+ Concept

Site da Ed&+ Concept, com decoração em impressão 3D, presentes personalizados e bolsas artesanais de crochê.

## Recursos

- Catálogo de oito peças reais, com filtros por categoria.
- Galeria de produtos com ampliação e fotos adicionais.
- Consulta pelo WhatsApp com o nome da peça e a ideia do visitante.
- Formulário de encomenda que prepara a mensagem sem enviá-la automaticamente.
- Layout responsivo, navegação por teclado e suporte a movimento reduzido.
- Perguntas frequentes e informações de privacidade.

## Executar localmente

Com o Node.js instalado, execute:

```sh
npm run dev
```

Abra **http://127.0.0.1:4173**. O projeto não exige instalação de dependências.

## Estrutura

```text
dist/
  index.html       Conteúdo e estrutura das páginas
  styles.css       Identidade visual e layout
  refinements.css  Galeria, controles de toque e legibilidade
  app.js           Catálogo, filtros, galeria e WhatsApp
  assets/          Fotos reais e ícone da marca
server.mjs         Servidor local para desenvolvimento
```

## Personalizar

Os produtos ficam no início de `dist/app.js`. Cada item define nome, categoria, filtros, foto, enquadramento, descrição e publicação de referência. O campo opcional `photos` recebe objetos com `src` e `label` para os ângulos adicionais.

O WhatsApp de atendimento é **(47) 99770-7312**. Para alterá-lo, atualize `WHATSAPP_NUMBER` em `dist/app.js` e os links de fallback de `dist/index.html`.

As fotos e as referências comerciais são da [Ed&+ Concept no Instagram](https://www.instagram.com/edemaisconcept/). Cores, medidas, preços, disponibilidade, pagamento e entrega são consultados no atendimento.

## Publicar

Publique o conteúdo de **`dist/`** em uma hospedagem de arquivos estáticos. Não é necessário executar uma etapa de build. Para usar outro endereço, atualize `og:url` e `og:image` em `dist/index.html` com o domínio definitivo.

## Validação

```sh
npm run check
```

Esse comando verifica a sintaxe do JavaScript. A versão atual também foi revisada no navegador em larguras de 320, 390, 768 e 1440 px.

## Medição e privacidade

Não há cadastro, checkout, cookies de publicidade, Meta Pixel ou Google Analytics configurados. O formulário não armazena dados e só prepara a conversa no WhatsApp.

O evento local `edemais:interaction` oferece pontos de integração para `view_product`, `view_photo`, `collection_filter` e `whatsapp_click`. Esses eventos não transmitem informações por conta própria. Um clique no WhatsApp representa intenção de contato e não confirma uma venda.
