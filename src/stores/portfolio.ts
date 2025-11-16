import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TechStack {
  [category: string]: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  startDate: string
  endDate: string
  current?: boolean
  client?: string
  projectDescription?: string
  missions?: string[]
  technicalStack?: TechStack
  description?: string[]
  website?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  highlights?: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface Teaching {
  id: string
  institution: string
  position: string
  courses: string[]
  startDate: string
  endDate?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link: string
  startDate: string
  endDate: string
}

export interface PersonalInfo {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  bio: string
  id: string
  birthDate: string
  nationality: string
}

export const usePortfolioStore = defineStore('portfolio', () => {
  const personalInfo = ref<PersonalInfo>({
    firstName: 'Cheikh Tidian' +
      'e',
    lastName: 'Traoré',
    title: 'Développeur Backend & DevOps',
    email: 'atidiane741@gmail.com',
    phone: '(+221) 781706184',
    location: 'Pikine, Sénégal',
    bio: 'Développeur Backend et DevOps avec une expérience diversifiée sur des projets en entreprise et en startup. À contribué à l\'amélioration de la qualité du code, à l\'automatisation de pipelines CI/CD et à la gestion d\'infrastructures cloud et de la sécurité opérationnelle.',
    id: '8022176063',
    birthDate: '02/10/2001',
    nationality: 'Mauritanienne',
  })

  const experiences = ref<Experience[]>([
    {
      id: '1',
      company: 'LIC',
      role: 'Développeur Fullstack Junior',
      location: 'Dakar, Sénégal',
      startDate: '11/2025',
      endDate: 'Présent',
      current: true,
      client: 'LIC',
      projectDescription: 'Création et lancement de la première plateforme web de la startup avec architecture modulaire',
      missions: [
        'Contribution directe à la création et au lancement de la première plateforme web de la startup.',
        'Développement de prototypes et initiation de projets SaaS pour structurer l\'offre technologique.',
        'Participation à la conception d\'une architecture modulaire et évolutive pour les futurs services numériques.',
      ],
      technicalStack: {
        'Frontend': ['Vue.js', 'TypeScript'],
        'Backend': ['Node.js', 'Express'],
        'Bases de données': ['PostgreSQL', 'MongoDB'],
        'Outils': ['Docker', 'Git', 'GitHub'],
      },
      website: 'https://lic.sn',
    },
    {
      id: '2',
      company: 'G&G Professional Services',
      role: 'Consultant Informatique & Analyste SOC',
      location: 'Pikine Ouest, Sénégal',
      startDate: '07/2025',
      endDate: 'Présent',
      current: true,
      client: 'Clients divers - PME/PMI',
      projectDescription: 'Solutions Odoo et infrastructure informatique sécurisée',
      missions: [
        'Développement et personnalisation de solutions Odoo adaptées aux besoins métiers des clients.',
        'Supervision de l\'infrastructure informatique et optimisation des outils Microsoft 365.',
        'Implémentation de mesures de sécurité avancées, incluant l\'authentification multifacteur et la surveillance des systèmes.',
      ],
      technicalStack: {
        'ERP': ['Odoo'],
        'Cloud': ['Microsoft 365', 'Azure'],
        'Sécurité': ['Microsoft Entra', 'MFA'],
        'Monitoring': ['Windows Defender', 'Event Viewer'],
      },
      website: 'https://gandgcorp.com',
    },
    {
      id: '3',
      company: 'Teksi Inc',
      role: 'Développeur Backend & DevOps Junior',
      location: 'Montreal, Canada',
      startDate: '04/2025',
      endDate: 'Présent',
      current: true,
      client: 'Clients SaaS - Fintech',
      projectDescription: 'Architecture microservices avec CI/CD automatisé et déploiement cloud',
      missions: [
        'Intégration et maintenance de pipelines CI/CD avec Docker.',
        'Développement et maintenance des services backend en SpringBoot.',
        'Participation active à des sprints Agile (Scrum/Kanban) et coordination d\'équipe à distance via Jira, Confluence et Microsoft Teams.',
        'Contribution à l\'optimisation des performances et à la fiabilité des services backend pour le déploiement cloud.',
      ],
      technicalStack: {
        'Backend': ['SpringBoot', 'Java', 'REST API'],
        'DevOps': ['Docker', 'Kubernetes', 'Jenkins', 'GitLab CI'],
        'Cloud': ['AWS', 'DigitalOcean'],
        'Bases de données': ['PostgreSQL', 'Redis'],
        'Méthodologie': ['Scrum', 'Agile'],
      },
      website: 'https://teksi.ca',
    },
  ])

  const education = ref<Education[]>([
    {
      id: '1',
      institution: 'Institut Supérieur d\'Informatique (ISI)',
      degree: 'Licence en Génie Logiciel',
      field: 'Développement et analyse de logiciels et d\'applications',
      location: 'Dakar, Sénégal',
      startDate: '05/01/2023',
      endDate: '08/09/2025',
      highlights: [
        'Moyenne : 17,47/20',
        'Certificat d\'Excellence - Licence 3',
      ],
    },
    {
      id: '2',
      institution: 'Lycée Ba Souley',
      degree: 'Baccalauréat Scientifique',
      field: 'Sciences naturelles, mathématiques et statistiques',
      location: 'Nouakchott, Mauritanie',
      startDate: '02/10/2015',
      endDate: '15/06/2018',
    },
  ])

  const projects = ref<Project[]>([
    {
      id: '1',
      name: 'Application de Covoiturage Communautaire',
      description: 'Offrir une solution locale, scalable et inclusive pour améliorer les déplacements quotidiens à Dakar (solution de covoiturage).',
      technologies: ['Node.js', 'Flutter', 'GetX', 'MongoDB', 'Docker'],
      link: 'https://github.com/TyvaaServices/tyvaa-frontend',
      startDate: '01/01/2025',
      endDate: '08/09/2025',
    },
    {
      id: '2',
      name: 'Jenv Cli',
      description: 'Outil pour gérer facilement plusieurs versions de JDK (Java Development Kit) sur différentes plateformes.',
      technologies: ['Python', 'Batch', 'PowerShell', 'CLI'],
      link: 'https://github.com/traorecheikh/ch-jdk-changer',
      startDate: '01/01/2025',
      endDate: '08/09/2025',
    },
    {
      id: '3',
      name: 'Application de Gestion de Boisson (SAAS)',
      description: 'SAAS complet sous JEE et Vue 3 pour la gestion de stock de boissons (respect des logiques FEFO, FIFO).',
      technologies: ['JEE', 'Vue 3', 'DDD', 'CDI', 'Jakarta'],
      link: '#',
      startDate: '03/07/2025',
      endDate: '18/08/2025',
    },
  ])

  const skills = ref({
    applicativeDevelopment: [
      'Flutter', 'SpringBoot', 'Quarkus', 'Cassandra', 'Redis', 'Odoo',
      'Flask', 'FastApi', 'Node.js', 'Angular', 'Postgres', 'Docker',
      'Terraform', 'DigitalOcean', 'Azure', 'MongoDB', 'Vue',
    ],
    securityCloud: [
      'Microsoft Entra', 'Prometheus', 'Grafana', 'Nmap',
      'Intune', 'Wireshark', 'SSO', 'ELK', 'System Hardening',
    ],
    aiML: [
      'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib',
      'Genkit', 'N8N', 'DialogFlow',
    ],
    methodology: [
      'Kanban', 'Jira', 'Microsoft Teams', 'Scrum',
      'Confluence', 'Trello', 'Slack',
    ],
  })

  const languages = ref([
    { language: 'Français', mother: true, comprehension: 'C1', speaking: 'C1', writing: 'C1' },
    { language: 'Anglais', comprehension: 'C1', speaking: 'C1', writing: 'C1' },
    { language: 'Arabe', comprehension: 'B1', speaking: 'B1', writing: 'A1' },
  ])

  const certifications = ref<Certification[]>([
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      credentialUrl: '#',
    },
    {
      id: '2',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
      credentialUrl: '#',
    },
    {
      id: '3',
      name: 'Microsoft Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      issueDate: '2024',
      credentialUrl: '#',
    },
    {
      id: '4',
      name: 'LPIC-1 Linux Professional Institute Certification',
      issuer: 'Linux Professional Institute',
      issueDate: '2024',
      credentialUrl: '#',
    },
  ])

  const teaching = ref<Teaching[]>([
    {
      id: '1',
      institution: 'Efrei Paris',
      position: 'Professeur de DevOps/Cloud',
      courses: [
        'Sécurité dans le cloud Azure',
        'Gestion de Parc Informatique Azure',
        'DevSecOps',
        'Sécurité dans le cloud AWS',
        'AWS Cloud Practitioner',
      ],
      startDate: '2023',
    },
    {
      id: '2',
      institution: 'The NumFactory',
      position: 'Professeur de DevOps/Cloud',
      courses: [
        'Administrateur Azure',
        'Windows Serveur',
      ],
      startDate: '2023',
    },
    {
      id: '3',
      institution: 'CPE Lyon et CESI Le Mans',
      position: 'Professeur de DevOps/Cloud',
      courses: [
        'Sécurité dans le cloud AWS',
      ],
      startDate: '2023',
    },
  ])

  return {
    personalInfo,
    experiences,
    education,
    projects,
    skills,
    languages,
    certifications,
    teaching,
  }
})
