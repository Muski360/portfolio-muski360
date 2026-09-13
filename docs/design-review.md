# Revisão visual e técnica — 13/09/2026

## Direção aplicada

A skill Awwwards orientou a auditoria, composição, movimento, remoção de padrões genéricos e avaliação do resultado renderizado. O eixo visual é o próprio material de Murilo: disquete MUSKI360, retrato e gravação do Mentup. Papel quente, tinta escura, laranja e tipografia condensada conectam as páginas.

| Decisão | Resultado |
| --- | --- |
| Preservar | Conteúdo pessoal, rotas, contatos, repositórios, certificações e funcionamento da navegação |
| Remover e simplificar | Microtextos ornamentais apontados na revisão, anotações redundantes e Mentup na homepage |
| Recompor | Homepage como apresentação e índice; tecnologias em `/sobre`; projetos completos em `/projetos` |
| Introduzir | 404 com o PNG original convertido em WebP, rodapé com rolagem de letras e coleção de projetos independente da homepage |
| Refinar | Cadência e emenda do vídeo, fallback de fontes, pausa, reprodução bloqueada, foco e retorno pelo histórico |

O disquete continua sendo a assinatura da abertura. Na 404, ele ocupa o lugar do zero, com recuperação de navegação imediatamente abaixo. A animação do rodapé foi escolhida pela relação com um suporte físico e com a tipografia existente: um movimento curto em sequência, seguido de repouso. Distorção permanente e ruído extra acrescentariam competição ao retrato e ao vídeo.

A inspeção comparou as capturas anteriores com as versões renderizadas em desktop, celular e larguras intermediárias. Foram corrigidos uma imagem da 404 com altura indevida, o fundo aparente do vídeo, quadros repetidos no transcode e títulos que excediam a tela quando a fonte falhava. O trecho de estudos também perdeu a frase introdutória redundante.

## Verificações realizadas

| Verificação | Evidência |
| --- | --- |
| Build e lint | `npm run build` e `npm run lint` concluídos |
| Reflow | Cinco rotas em 320, 390, 768, 1024, 1440 e 1920 px: 30 cenários sem overflow horizontal |
| Acessibilidade automática | Axe WCAG A/AA em 390 e 1440 px: zero violações nas cinco rotas; auditoria adicional do nome acessível do título animado |
| Entrada e navegação | Menu, Escape, foco restaurado, foco no conteúdo, disquete por teclado e toque, retorno à posição anterior pelo histórico; emulação touch sem hover e sem overflow |
| Movimento | Pausa global, movimento reduzido, animação do rodapé ao aparecer/focar e interrupção ao pausar |
| Falhas de recursos | Fontes bloqueadas, vídeo bloqueado, ausência de IntersectionObserver e autoplay negado: conteúdo e navegação preservados nas cinco rotas; retomada manual dos dois vídeos verificada |
| Sem JavaScript | Conteúdo, títulos e navegação mobile disponíveis nas cinco rotas |
| Projetos múltiplos | Renderização em memória com um segundo registro temporário: dois projetos, IDs e destinos distintos; quadra restrita ao Mentup |
| Navegadores | Chrome e Edge locais em modo headless; desktop e viewport mobile |

O loop foi observado por duas voltas completas no navegador: nenhum quadro descartado, passagem do tempo 7,708 → 0 s sem pausa perceptível de decodificação. A diferença visual entre os quadros da emenda ficou abaixo da diferença média entre quadros do vídeo. A fonte original não contém duas poses idênticas; o fechamento usa trim e uma interpolação curta entre imagens próximas, sem inverter a rotação.

## Desempenho e limites

Lighthouse mobile em build local de produção: **92 desempenho, 100 acessibilidade, 100 boas práticas e 100 SEO**. FCP 2,0 s, LCP 3,2 s, CLS 0 e TBT 0 ms. São medições de laboratório, sujeitas a variação; não representam dados de usuários reais nem uma certificação de acessibilidade.

Os vídeos publicados somam aproximadamente 1,58 MB e usam carregamento por visibilidade; as fontes são locais. Nenhuma biblioteca de animação foi adicionada. Playwright, Axe e Lighthouse foram usados localmente para a revisão, sem alteração nas dependências de produção.

Safari/iPhone físico não foi validado: o download do WebKit de teste falhou por timeout. O serviço de hospedagem publicado também não foi testado nesta revisão. A prévia local confirma o HTML estático e os códigos de resposta, incluindo 404.

Capturas e relatórios detalhados permanecem em `.design-review/`, ignorado pelo Git. Scripts locais principais: `verify.mjs`, `extended-verify.mjs`, `browser-final.mjs` e `loop-result.json`.
