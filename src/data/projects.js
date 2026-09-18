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

export const experiments = [
  {
    area: 'Frontend',
    projects: ['EstudosReact', 'SimuladoSAEP-Angular'],
    text: 'Estudos de interfaces, componentes e aplicações com React e Angular.',
  },
  {
    area: 'Backend & APIs',
    projects: ['API_crud', 'Estudo_API', 'biblioteca_api_json'],
    text: 'Exercícios com APIs, operações CRUD, persistência e regras de negócio.',
  },
  {
    area: 'IA & Python',
    projects: ['Curso_IA_SENAI', 'curso_python', 'curso_ds_projetos'],
    text: 'Experimentos com Python, dados e inteligência artificial aplicada.',
  },
  {
    area: 'Mobile & outros',
    projects: ['mobile', 'fit_life', 'gamestore'],
    text: 'Projetos que ampliam o contato com mobile e diferentes formatos de produto.',
  },
]
