// Add complete projects here. The project route renders this collection in order.
export const projects = [
  {
    id: 'mentup',
    name: 'Mentup',
    category: 'Campeonatos de vôlei de praia',
    type: 'Aplicação web',
    color: '#f45b35',
    graphic: 'court',
    description:
      'Plataforma para criação e gerenciamento de campeonatos de vôlei de praia. O sistema reúne usuários, times, jogadores, fases, partidas, resultados e classificação.',
    technologies: ['PHP 8.3', 'PostgreSQL', 'JavaScript', 'Docker', 'Apache'],
    repository: 'https://github.com/Muski360/Mentup',
    video: '/media/mentup.mp4',
    poster: '/media/mentup-poster.webp',
    mediaAlt: 'Interface real do Mentup, plataforma para organizar campeonatos',
    detailTitle: ['Do cadastro', 'ao resultado.'],
    detailText:
      'Autenticação, banco relacional e regras de negócio conectam cada etapa do campeonato em um só sistema.',
    features: [
      ['Geração automática', 'Geração automática de partidas e fases.'],
      ['Formatos de disputa', 'Grupos, pontos corridos e mata-mata.'],
      ['Usuários e dados', 'Autenticação e modelagem relacional.'],
      ['Partidas e classificação', 'Resultados por sets e avanço automático.'],
    ],
  },
]

export const skills = [
  ['Java', 'Base para back-end e orientação a objetos'],
  ['Spring Boot', 'APIs e aplicações web'],
  ['React', 'Interfaces componentizadas'],
  ['PostgreSQL', 'Modelagem e consultas relacionais'],
  ['JavaScript', 'Interação e lógica no front-end'],
  ['Docker', 'Ambientes e infraestrutura básica'],
]

export const experiments = [
  {
    area: 'Frontend',
    projects: 'EstudosReact · SimuladoSAEP-Angular',
    text: 'Estudos de interfaces, componentes e aplicações com React e Angular.',
  },
  {
    area: 'Backend & APIs',
    projects: 'API_crud · Estudo_API · biblioteca_api_json',
    text: 'Exercícios com APIs, operações CRUD, persistência e regras de negócio.',
  },
  {
    area: 'IA & Python',
    projects: 'Curso_IA_SENAI · curso_python · curso_ds_projetos',
    text: 'Experimentos com Python, dados e inteligência artificial aplicada.',
  },
  {
    area: 'Mobile & outros',
    projects: 'mobile · fit_life · gamestore',
    text: 'Projetos que ampliam o contato com mobile e diferentes formatos de produto.',
  },
]

export const certifications = [
  {
    name: 'Inteligências Artificiais Generativas Aplicada a Programação',
    org: 'SENAI São Paulo',
    date: 'jul 2026',
    type: 'Técnica',
  },
  {
    name: 'Programação em Python com Framework',
    org: 'SENAI São Paulo',
    date: 'dez 2025',
    type: 'Técnica',
  },
  {
    name: 'Produção de vídeo: conceitos essenciais',
    org: 'Alura',
    date: 'set 2023',
    url: 'https://cursos.alura.com.br/certificate/d1e7f5cd-269c-4d79-838d-0b05782a1a35?lang',
    type: 'Audiovisual',
  },
  {
    name: 'Premiere: ritmo de edição e manipulando emoções',
    org: 'Alura',
    date: 'out 2023',
    url: 'https://cursos.alura.com.br/certificate/a95aa906-c66a-4060-97c5-3f29f85465cc?lang',
    type: 'Audiovisual',
  },
  {
    name: 'Adobe Premiere: vídeos institucionais',
    org: 'Alura',
    date: 'dez 2023',
    url: 'https://cursos.alura.com.br/certificate/b5f68625-355f-40aa-b474-f6d659449d4a?lang',
    type: 'Audiovisual',
  },
  {
    name: 'Adobe Premiere 2020: edição de vídeo',
    org: 'Alura',
    date: 'out 2023',
    url: 'https://cursos.alura.com.br/certificate/8fb6e198-5e97-40c0-9d4c-784c30ca79f3?lang',
    type: 'Audiovisual',
  },
]
