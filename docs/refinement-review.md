# Refinamento visual e arquitetura — 16/09/2026

## Resultado

A nova passagem usou a skill Awwwards para comparar identidade, composição, movimento, responsividade e qualidade de implementação com a versão anterior. Foram aplicados os guias de identidade visual, auditoria crítica, padrões genéricos, movimento e avaliação. A direção continua apoiada nos materiais reais: disquete MUSKI360, retrato, vídeo do Mentup e fontes locais.

| Decisão | Implementação e efeito |
| --- | --- |
| Preservar | A abertura com o disquete, retrato, papel/laranja/tinta, loop preparado, 404 com o asset original e movimento breve do rodapé continuam formando a identidade. Rotas, contatos, repositórios e informações pessoais foram mantidos. |
| Simplificar | A abertura de `/projetos` passou a “PROJETOS.”, com menos altura antes do trabalho. No celular, a primeira tela já apresenta o Mentup e sua interface. |
| Refinar | `/experiencias` agora começa com “EM FORMAÇÃO.” e o progresso real de três dos quatro termos. As datas 2024–2026 organizam a formação sem outra frase introdutória. |
| Corrigir | A inspeção final detectou uma regra de tamanho das datas aplicada depois das regras mobile. A ordem foi corrigida, eliminando o transbordamento em 320 e 390 px. |
| Remover | Assets do template, seletores sem uso, declarações repetidas e a propriedade de numeração que já não era usada em `SectionLabel`. Nenhuma dependência de produção foi adicionada. |

A comparação final incluiu páginas completas em 390, 768 e 1440 px. O ponto mais fraco da versão anterior era a repetição de aberturas com frases grandes e contraste de fontes antes de chegar ao conteúdo. Projetos e Experiências ganharam estruturas mais diretas, preservando o contraste tipográfico onde ele ainda ajuda a leitura. O disquete permanece como assinatura; outra camada de efeitos competiria com esse elemento sem benefício suficiente.

## Estrutura e responsabilidades

`App.jsx` passou de aproximadamente 900 linhas para a composição do roteador e layout. As páginas ficam em `src/pages/`; componentes compartilhados estão agrupados por função em `src/components/`. Projetos, estudos, tecnologias, certificações e contatos ficam em `src/data/`. A coleção de projetos continua independente da homepage e suporta mídia com vídeo ou somente poster.

`src/routes.js` centraliza caminhos, títulos, descrições e indexação para o cliente, build estático e servidor de prévia. A recuperação da 404 restaura canonical e indexação. A navegação conserva a posição de leitura pelo histórico; voltar com o menu aberto fecha o diálogo, libera a rolagem e direciona o foco ao conteúdo.

`Film` apresenta a mídia e os controles; `useVideoPlayback` reúne reprodução, visibilidade, pausa e seleção de quadro. A retomada ocorre dentro do gesto do usuário, sem um efeito que interrompa o próprio pedido de reprodução. Pedidos antigos de reprodução não sobrescrevem o estado atual. O progresso da rotação atualiza o controle nativo sem renderizar novamente o componente a cada atualização do vídeo. A variante de disquete é explícita e não depende do nome de um projeto.

Os estilos foram separados por área em `src/styles/`, com regras responsivas junto à composição correspondente. A reorganização foi comparada por estilos computados e capturas renderizadas. O CSS de produção caiu de **45,92 kB para 38,78 kB**; comprimido, de **10,07 kB para 8,68 kB**. O JavaScript final ficou em **293,92 kB / 92,28 kB gzip**. Bibliotecas extras de animação não foram necessárias. A configuração existente do Wrangler foi preservada.

## Validação

| Verificação | Resultado observado |
| --- | --- |
| Build e lint | `npm run build` e `npm run lint` concluídos; quatro páginas e 404 pré-renderizadas. O lint também cobre os scripts Node. |
| Suíte principal | **260/260 verificações passaram**, incluindo assets, imports, conteúdo estático, navegação, falhas de recursos e interação. Nenhum erro inesperado de console. |
| Responsividade | Cinco rotas em 320, 390, 768, 1024, 1440 e 1920 px: 30 combinações sem overflow horizontal. Inclui reflow estreito, toque e orientação horizontal. |
| Acessibilidade | Dez auditorias axe, nas cinco rotas em desktop e mobile, sem violações detectadas; foco, menu, Escape, controles e movimento reduzido exercitados. A automação não certifica acessibilidade completa. |
| Interações adicionais | **10/10 no Chrome e 10/10 no Edge**: histórico com menu aberto, recuperação da 404, âncora de projetos, pausa fora da tela, repouso do rodapé e seleção antes de carregar metadados. |
| Recursos e degradação | 20 assets e 54 imports verificados; conteúdo disponível sem JavaScript. Fontes bloqueadas, vídeo bloqueado, autoplay negado e ausência de IntersectionObserver conservam os caminhos de leitura e navegação. |
| Servidores locais | 30 verificações de rotas e 34 comparações dos bytes de assets passaram no Vite e Wrangler. Endereços desconhecidos, incluindo caminhos aninhados e arquivos inexistentes, respondem 404. |

O Lighthouse mobile da homepage no build final mediu **92 desempenho, 100 acessibilidade, 100 boas práticas e 100 SEO**. FCP: **2,0 s**; LCP: **3,2 s**; CLS: **0**; TBT: **0 ms**. São medidas de laboratório locais, sujeitas a variação, sem dados de usuários reais.

## Limites verificados

O Wrangler local respondeu `200` com o vídeo inteiro a pedidos `Range`, enquanto o Vite respondeu `206` com os bytes pedidos. No emulador, o Chrome informou `seekable` de 0 a 0, mesmo com o vídeo carregado; a seleção manual de rotação voltou ao início. As duas verificações de Range permanecem registradas como falhas locais. Na prévia Vite, seleção manual, reprodução e retomada passaram. Não foi adicionado um download extra via blob para contornar o servidor de desenvolvimento.

Esse resultado não comprova falha no Cloudflare publicado. Nenhum deploy foi feito; o suporte a Range e a rotação manual devem ser conferidos na próxima publicação. Safari/iPhone físico também não foi validado; a tentativa de obter WebKit para o ambiente de teste falhou por timeout.

Capturas e relatórios ficam em `.design-review/`, ignorado pelo Git: `round2-validation.json`, `round2-extra-chrome.json`, `round2-extra-msedge.json`, `round2-host.json`, `lighthouse-round2.json` e capturas `round2-*.png`. O README documenta a nova organização e os pontos de edição.

## Smooth scroll — 18/09/2026

Foi escolhido **Lenis 1.3.26 com `lenis/react`**, após comparar três soluções:

| Opção | Adequação ao projeto |
| --- | --- |
| [Lenis](https://github.com/darkroomengineering/lenis) | Integração React oficial, rolagem sobre o documento nativo e controle direto da suavização. Atende à necessidade com uma dependência. |
| [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) | A versão atual usa Lenis e acrescenta detecção e parallax; o site já tem seus observadores e animações de scroll. |
| [GSAP ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/) | Apropriado para uma experiência coordenada por GSAP/ScrollTrigger. Exigiria essa estrutura e wrappers de conteúdo, sem ganho necessário neste caso. |

`SmoothScroll` usa interpolação curta (`lerp: 0.12`) no mouse e trackpad. Toque, teclado e barra de rolagem continuam nativos. O controle existente de movimento e a preferência do sistema desmontam o Lenis, preservando a posição; não há outro botão ou contexto próprio para a biblioteca. O wrapper React cuida da criação, animação e destruição da instância.

O teste de interrupção encontrou inércia ainda ativa depois de Home. Um listener pequeno devolve o controle antes da navegação por teclado ou do início de seleção com o ponteiro. Os listeners são removidos no teardown; três ciclos de pausa e retomada mantiveram a mesma contagem de listeners na janela.

`RouteEffects` continua responsável por âncoras, foco e histórico. Trocas de rota cancelam a inércia e recalculam as dimensões antes de posicionar a página. O menu suspende o Lenis e conserva a rolagem interna do diálogo. Os links compartilhados mantêm `href="#conteudo"`, evitando que a pré-renderização da 404 substitua o endereço desconhecido por `/404`. Foi removido o preload redundante da DM Sans: Vite emitia URLs diferentes no HTML e CSS para o nome com colchetes, causando dois downloads da mesma fonte. A fonte dos grandes títulos continua pré-carregada; DM Sans é carregada pelo CSS.

**Validação:** build e lint passaram; a suíte geral passou **263/263 verificações** em 30 combinações de rota e largura, sem erros inesperados de console. Passaram **16 verificações de scroll no Chrome e 16 no Edge**, mais **nove casos adicionais** de hash na 404, listeners, deltas pequenos, seleção, PageDown, deep link e swipe touch emulado. As capturas finais confirmam a composição durante a rolagem. Mouse e toque foram exercitados por automação; trackpad foi representado por deltas pequenos, sem teste em hardware físico.

O JavaScript final com a integração ficou em **315,67 kB / 98,40 kB gzip**, acréscimo de **6,12 kB gzip** sobre a revisão anterior. A medição Lighthouse mobile continua em **92/100/100/100**, com CLS 0 e TBT 0 ms. Relatórios locais: `lenis-chrome.json`, `lenis-msedge.json`, `lenis-edge-cases.json` e `lighthouse-lenis.json`; verificações reproduzíveis nos scripts `lenis-check.mjs` e `lenis-edge-cases.mjs` em `.design-review/`.
