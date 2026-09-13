# MUSKI360

Portfólio pessoal de Murilo Bastos, estudante de Desenvolvimento de Sistemas no SENAI Americana.

[Website](https://muski360.dev) · [GitHub](https://github.com/Muski360) · [LinkedIn](https://www.linkedin.com/in/murilo-dovigo-bastos-36b7a537a/)

Criei este portfólio para apresentar minha trajetória, meus interesses e as tecnologias que estudo. Comecei a me interessar por programação ainda na infância e hoje curso Técnico em Desenvolvimento de Sistemas no SENAI. Pretendo cursar Ciência da Computação e seguir carreira como desenvolvedor profissional; inteligência artificial está entre as áreas que mais despertam minha curiosidade.

## Executar

Use Node.js 22.13 ou superior e npm.

```sh
npm install
npm run dev
```

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build e HTML estático de todas as páginas em `dist/` |
| `npm run preview` | Prévia local de produção, incluindo HTTP 404 |
| `npm run lint` | Verificação com ESLint |

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Apresentação, retrato e acesso a projetos e formação |
| `/sobre` | História, interesses, tecnologias e contato |
| `/projetos` | Projetos completos e repositórios de estudos |
| `/experiencias` | Formação, prática e certificações |
| Endereço inexistente | 404 com retorno ao início |

React 19 e React Router mantêm a navegação. Vite 8 gera os arquivos de produção; `scripts/build.mjs` renderiza a mesma árvore React em HTML. Conteúdo e navegação continuam disponíveis antes do JavaScript carregar, inclusive no celular.

## Editar conteúdo

1. Adicione projetos à coleção `projects` em [src/content.js](src/content.js). Cada registro contém `id` único, nome, categoria, tipo, cor, descrição, tecnologias, repositório, vídeo, poster, texto alternativo, título de detalhes, explicação e funcionalidades. Use o Mentup como referência de estrutura; não é necessário editar a homepage.
2. Coloque os arquivos otimizados em `public/media/`. `graphic: 'court'` é uma opção específica para a composição do Mentup; omita esse campo nos demais projetos. Verifique o contraste quando escolher uma nova cor.
3. Edite também as coleções de tecnologias, estudos e certificações em `src/content.js`. Perfil, contatos e composição das páginas ficam em `src/App.jsx`.
4. Atualize metadados em `PageMeta` e `scripts/build.mjs`, além de `public/sitemap.xml` e `public/llms.txt`, quando o conteúdo mudar.

## Identidade e movimento

As imagens e vídeos vêm de `references/`; os originais são preservados. O PNG `Disquete.png` origina o WebP usado na 404. Fontes locais Barlow Condensed, DM Sans e DM Mono incluem as licenças OFL em `public/fonts/`.

`src/App.css` concentra composição e responsividade. `src/Media.jsx` controla vídeos, retrato, animação do rodapé e preferência de movimento. O disquete permite escolher uma posição com mouse, toque ou teclado. O rodapé anima brevemente ao aparecer e ao receber foco ou ponteiro; não permanece em movimento contínuo.

O controle no cabeçalho pausa os movimentos. `prefers-reduced-motion` mantém a apresentação estática, vídeos fora da tela são pausados e posters permanecem disponíveis quando o vídeo falha. O menu mobile usa um diálogo nativo com navegação alternativa no HTML estático.

Para reproduzir a preparação do loop, instale FFmpeg com libvpx-vp9 e libx264 no PATH e execute:

```sh
node scripts/prepare-disk.mjs
```

O script usa o original, normaliza os timestamps a 24 fps, corta a volta e cria cinco quadros intermediários para a emenda. O MP4 final tem 7,75 segundos e 186 quadros. FFmpeg não é necessário para executar ou publicar o site.

## Publicação

Execute `npm run build` e publique `dist/`. A configuração da Vercel usa `cleanUrls` e o arquivo estático `404.html`; não é necessário redirecionar todas as rotas para `index.html`. Em outro serviço, configure os quatro caminhos para os arquivos HTML correspondentes e uma resposta 404 real para endereços inexistentes.

Veja as decisões visuais, testes e limitações em [docs/design-review.md](docs/design-review.md).
