import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TechStack {
  [category: string]: string[]
}

export interface SubProject {
  title: string
  description: string
  missions?: string[]
  technicalStack?: TechStack
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
  projects?: SubProject[]
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
    firstName: 'Makhmadane',
    lastName: 'LO',
    title: 'Senior Software Developer - DevOps | Cloud / IT trainer',
    email: 'dl7781775@gmail.com',
    phone: '77 302 21 50 / 78 434 71 42',
    location: 'Dakar, Sénégal',
    bio: 'Ingénieur Senior en Génie Logiciel avec 7+ ans d\'expertise en conception et déploiement de solutions scalables. Expert en architectures distribuées (microservices, cloud-native AWS) et automatisation DevOps/CI-CD. Spécialiste full-stack polyvalent (Java/Spring, Angular/React, Flutter/Laravel) avec un leadership technique avéré : pilotage de projets stratégiques, mentoring d\'équipes et optimisation des processus de développement. Formateur universitaire en Génie Logiciel, DevOps et Cloud Computing, alliant expertise terrain et transmission des connaissances',
    id: '1',
    birthDate: '',
    nationality: 'Sénégalaise',
  })


  const experiences = ref<Experience[]>([
    {
      id: '1',
      company: 'AXA ASSURANCE',
      role: 'Lead Développeur / Cloud',
      location: 'Place de l\'indépendance, Dakar, Sénégal',
      startDate: '24-04-2023',
      endDate: 'Présent',
      current: true,
      client: 'POLE : AFRIQUE DE OUEST',
      projects: [
        {
          title: 'PLATEFORME OPENINSUR',
          description: 'Mise en place une plateforme pour la vente d\'assurance dans la zone CIMA (SENEGAL-GABON-COTE IVOIRE-CAMEROUN)',
          missions: [
            'Implémentation des interfaces de l\'application web avec react-redux',
            'Implémentation des micro-services backend',
            'Implémentation des test unitaires/intégrations',
            'Implémentation des tests de composant',
            'Implémentation des déploiements AWS/ OPENSHIFT',
            'Implementation : WAVE /OM pour différente pays (SENEGAL-GABON-COTE IVOIRE-CAMEROUN)',
          ],
          technicalStack: {
            'Frontend': ['React 17', 'React Native', 'Redux', 'Redux-Saga', 'React Router', 'Styled-Components', 'React Hook Form', 'Yup', 'Auth0', 'Chart.js', 'ApexCharts', 'jsPDF', 'Workbox (PWA)', 'Axios', 'Webpack 5', 'Firebase'],
            'Backend': ['Java 17/11/8', 'Spring Boot', 'Spring Data', 'Microservices', 'PostgreSQL', 'Liquibase', 'Flyway', 'Kafka', 'RabbitMQ', 'Auth0 (OAuth2/JWT)', 'Pattern SAGA', 'REST API', 'Express'],
            'DevOps & Infrastructure': ['Docker', 'Jenkins', 'Git/GitHub', 'AWS (EC2, CloudWatch, RDS, CloudFormation)'],
            'Méthodologie': ['UML', 'Scrum'],
          },
        },
        {
          title: 'PLATEFORME DIGITFLEET',
          description: 'Mise en place une plateforme pour la vente des grandes flottes assurances pour le Sénégal',
          missions: [
            'Implémentation des interfaces de l\'application web avec Angular',
            'Implémentation des micro-services backend',
            'Implémentation des test unitaires/intégrations',
            'Implémentation des tests de composant',
          ],
          technicalStack: {
            'Frontend': ['Angular 17'],
            'Backend': ['Java 17/11/8', 'Spring Boot', 'Spring Data', 'Microservices', 'PostgreSQL', 'Liquibase', 'Kafka', 'RabbitMQ', 'JHipster', 'Auth0 (OAuth2/JWT)', 'Pattern SAGA', 'REST API'],
            'DevOps & Infrastructure': ['Docker', 'Jenkins', 'Git/GitHub', 'AWS (EC2, CloudWatch, RDS, CloudFormation)'],
            'Méthodologie': ['UML', 'Scrum'],
          },
        },
        {
          title: 'API AXA - INTOUCH',
          description: 'Mise en place des apis pour la vente assurance auto pour intégrer dans le système de intouch',
          missions: [
            'Implémentation des micro-services backend',
            'Implémentation des test unitaires/intégrations',
            'Implémentation de l\'intégration avec le système Intouch',
          ],
          technicalStack: {
            'Backend': ['Java 17', 'Spring Boot', 'Spring Cloud', 'Spring Data', 'Microservices', 'OpenFeign', 'PostgreSQL', 'Liquibase', 'Flyway', 'Kafka', 'Redis', 'Auth0 (OAuth2/JWT)', 'Pattern SAGA', 'REST API', 'Lombok', 'MapStruct', 'SpringDoc OpenAPI'],
            'DevOps & Infrastructure': ['Docker', 'Jenkins', 'Git/GitHub', 'AWS (Lambda, EC2, CloudWatch, RDS, CloudFormation, Secrets Manager)', 'Postman API'],
            'Méthodologie': ['UML', 'Scrum'],
          },
        },
        {
          title: 'API AXA – ORANGE MONEY (MAX IT)',
          description: 'Mise en place des apis pour la vente assurance sur la plateforme de orange money cote ivoire (assurance santé)',
          missions: [
            'Implémentation des micro-services backend',
            'Implémentation des test unitaires/intégrations',
            'Implémentation de l\'intégration avec Orange Money',
          ],
          technicalStack: {
            'Backend': ['Java 17', 'Spring Boot', 'Spring Cloud', 'Spring Data', 'Microservices', 'OpenFeign', 'PostgreSQL', 'Liquibase', 'Flyway', 'Kafka', 'Auth0 (OAuth2/JWT)', 'Pattern SAGA', 'REST API', 'Lombok', 'MapStruct'],
            'DevOps & Infrastructure': ['Docker', 'Jenkins', 'Git/GitHub', 'AWS (EC2, CloudWatch, RDS, CloudFormation)'],
            'Méthodologie': ['UML', 'Scrum'],
          },
        },
        {
          title: 'PROJET LEGACY AXA CIMA',
          description: 'Mise en place des API SOAP pour communiquer avec les legacy système d\'Axa avec des bases de données ISOPAC IBM (AS400) via Mulesoft (SOA)',
          missions: [
            'Implémentation des API SOAP',
            'Intégration avec les systèmes legacy AS400',
            'Implémentation de l\'architecture SOA avec Mulesoft',
          ],
          technicalStack: {
            'Backend': ['Java 17/11/8', 'Spring Boot', 'SOAP', 'REST API'],
            'Legacy & Integration': ['Mulesoft IBM', 'SQL Server', 'ISOPAC IBM (AS400)', 'SOA'],
            'DevOps & Infrastructure': ['Docker', 'Jenkins', 'Git/GitHub'],
            'Méthodologie': ['UML', 'Scrum'],
          },
        },
      ],
    },
    {
      id: '2',
      company: 'SONAC ASSURANCE',
      role: 'Lead Développeur Angular /Spring Boot',
      location: 'Place de l\'indépendance, Dakar, Sénégal',
      startDate: '01-10-2022',
      endDate: '01-12-2024',
      projectDescription: 'Projet Plateforme SENRE : Mise en place une plateforme pour les ré-assureurs d\'Afrique',
      missions: [
        'Implémentation des interfaces de l\'application web avec angular',
        'Implémentation des micro services backend',
        'Implémentation des test unitaires/intégrations',
        'Implémentation des tests unitaires',
        'Implémentation des tests composants angular',
      ],
      technicalStack: {
         'Technologies': ['Spring Boot', 'Spring Data', 'Liquibase', 'KEYCLOCK', 'Angular 12', 'Java 17', 'PostgreSQL'],
         'Outils': ['Docker', 'Jenkins', 'Rest API', 'Tomcat Apache', 'UML', 'GIT', 'GitHub'],
         'Méthode': ['Scrum'],
      },
    },
    {
      id: '3',
      company: 'SOUMARI SN',
      role: 'Consultant Développeur web/mobile',
      location: 'Avenue Lamine Gueye, Dakar, Sénégal',
      startDate: '01-09-2022',
      endDate: 'Aujourd\'hui',
      current: true,
      projectDescription: 'Projets Plateforme SOUMARI : Mise en place une plateforme de e-commerce web/mobile pour l\'entreprise SOUMARI',
      missions: [
        'Implémentation des interfaces de l\'application mobile avec fluter/dart',
        'Implémentation des interfaces de l\'application web avec angular',
        'Implémentation des micro-services backend',
        'Implémentation des test unitaires/intégrations',
        'Implémentation des tests unitaires',
        'Implémentation des tests composants angular',
      ],
      technicalStack: {
        'Technologies': ['Flutter', 'Dart', 'Laravel', 'Liquibase', 'Angular 12', 'Java 17', 'PostgreSQL'],
        'Outils': ['Docker', 'Rest Api', 'UML', 'GIT', 'GitHub'],
        'Méthode': ['Scrum'],
      },
    },
    {
      id: '4',
      company: 'NLDSOFTWARE',
      role: 'Développeur FULLSTACK (Web)',
      location: 'Liberté 6, Dakar, Sénégal',
      startDate: '06-07-2022',
      endDate: '06-09-2022',
      projectDescription: 'Projets Plateforme SENCARTOUR : Mise en place une plateforme de e-commerce pour l\'entreprise de SENCARTOUR',
      missions: [
        'Implémentation des interfaces de l\'application web',
        'Implémentation des API coté front',
        'Implémentation des API coté back',
        'Implémentation de API de PAYDUNYA',
        'Implémentation de l\'api email',
        'Création de la base de données',
        'CI/CD',
      ],
      technicalStack: {
        'Technologies': ['Laravel', 'PostgreSQL', 'MYSQL'],
        'Outils': ['UML', 'GIT', 'GitHub'],
        'Méthode': ['Scrum'],
      },
      website: 'https://www.senecartours.sn/',
    },
     {
      id: '5',
      company: 'NLDSOFTWARE',
      role: 'Développeur FULLSTACK (Web)',
      location: 'Liberté 6, Dakar, Sénégal',
      startDate: '11-03-2022',
      endDate: '06-07-2022',
      projectDescription: 'Projets VISITE TECHNIQUE : Mise en place une plateforme pour réserver une visite technique sans se déplacer du lieu de travaille',
      missions: [
        'Implémentation des interfaces de l\'application web avec angular',
        'Implémentation des API coté front',
        'CI/CD',
      ],
      technicalStack: {
        'Technologies': ['Angular', 'Spring boot', 'PostgreSQL', 'MYSQL'],
        'Outils': ['UML', 'GIT', 'GitHub'],
        'Méthode': ['Scrum'],
      },
      website: 'https://www.visitetechnique.com/',
    },
    {
      id: '6',
      company: 'SONATEL(SABLUX)',
      role: 'Développeur FULLSTACK (Web / Mobile)',
      location: 'Sacré Coeur, Dakar, Sénégal',
      startDate: '06-09-2021',
      endDate: '06-05-2022',
      projectDescription: 'Projets KAABU MOBILE : Mise en place d\'une application de gestion web et mobile pour les vendeurs terrains de la Sonatel sénégal.\n-Identification des puces\n-Changement des puces\n-Création Compte OM\n-Swap Sim',
      missions: [
        'Implémentions des interfaces de la partie back office avec angular',
        'Gestion des imports/exports de donnée avec les fichiers Excel',
        'Gestion des générations des factures avec PDF ou csv',
        'Implémentions des interfaces de la partie mobile office avec flutter',
        'Implémentation des api partie mobile',
        'Gestion des workers partie mobile',
        'Création de la BD avec PostgreSQL',
        'Implantation de l\'api sms de la Sonatel',
        'Implémentation des différentes micro services',
      ],
      technicalStack: {
        'Technologies': ['Angular', 'Spring boot', 'Flutter', 'MYSQL', 'Kibana', 'Elasticsearch'],
        'Outils': ['UML', 'GIT', 'GitHub', 'Git flow', 'JIRA', 'BITBUCKET'],
        'Méthode': ['Scrum'],
      },
    },
    {
      id: '7',
      company: 'NLDSOFTWARE',
      role: 'Développeur FULLSTACK (Web)',
      location: 'Liberté 6, Dakar, Sénégal',
      startDate: '01-04-2021',
      endDate: '06-07-2022',
      projectDescription: 'Projets Plateforme Taxis à Nantes : Mise en place d\'une application web et mobile pour la gestion d\'une compagnie de Taxis à Nantes (Réalisé avec Ionic & Laravel)',
      missions: [
        'Implémentation des interfaces de l\'application web',
        'Implémentation des API coté front',
        'CI/CD',
      ],
      technicalStack: {
        'Technologies': ['Laravel', 'Ionic', 'PostgreSQL', 'MYSQL'],
        'Outils': ['UML', 'GIT', 'GitHub'],
        'Méthode': ['Scrum'],
      },
      website: 'https://www.taxis-nantes.com/',
    },
    {
      id: '8',
      company: 'NLDSOFTWARE',
      role: 'INGENIEURIE DEVOPS',
      location: 'Sacré-Coeur, Dakar, Sénégal',
      startDate: '01-02-2021',
      endDate: '30-06-2021',
      projectDescription: 'Gestion des transactions de la Douane',
      missions: [
        'Mise en place CI/CD',
        'Conteneurisation',
        'Analyse de code',
      ],
      technicalStack: {
        'Technologies': ['ASP.net'],
        'DevOps': ['JENKINS', 'DOCKER', 'KUBERNETES', 'SONAR'],
        'Outils': ['GIT', 'GITHUB', 'JIRA', 'Trello', 'Slack'],
        'Méthode': ['Scrum'],
      },
    },
    {
      id: '9',
      company: 'OCTASEN',
      role: 'Développeur FULLSTACK (web/mobile/DevOps)',
      location: 'Fass Medina, Dakar, Sénégal',
      startDate: '01-10-2019',
      endDate: '30-12-2020',
      projectDescription: 'Projets :\n• Mise en place d\'une application de gestion et suivi des livraisons via Google Maps (YESCOLA)\n• Mise en place d\'une application de gestion école (JARDIN-PRIMAIRE-SECONDAIRE-LYCEE)\n• Mise en place d\'une application d\'une entreprise de Lavage',
      missions: [
        'Implémentions des interfaces de la partie back office avec angular',
        'Gestion des imports/exports de donnée avec les fichiers Excel',
        'Gestion des générations des factures avec PDF ou csv',
        'Implémentation de l\'api de géolocalisation de Google Maps',
        'Implémentation de l\'api de payement de paydunya',
        'Implémentions des interfaces de la partie mobile office avec flutter',
        'Création de la BD avec PostgreSQL Implémentation des différentes micro services',
      ],
      technicalStack: {
        'Technologies': ['Angular', 'Flutter', 'Laravel', 'Spring Boot', 'PostgreSQL', 'MySQL', 'Bootstrap'],
        'DevOps': ['JENKINS', 'SONAR', 'DOCKER', 'AWS'],
        'Outils': ['UML', 'GIT', 'GitHub', 'Trello', 'Slack'],
        'Méthode': ['Scrum'],
      },
    },
    {
      id: '10',
      company: 'Institut Supérieur Informatique (ISI)',
      role: 'Développeur FULLSTACK (web/mobile)',
      location: 'Médina, Dakar, Sénégal',
      startDate: '01-07-2019',
      endDate: '30-09-2019',
      projectDescription: 'Projets :\n• Gestion d\'une application d\'archivage des documents électroniques pour ISI.',
      missions: [
        'Implémentation des interfaces de l\'application web',
        'Implémentation des API avec la partie back end',
        'Export/Import des documents scolaires',
        'Implémentation des API coté front',
        'Création de la BD avec Mongo DB',
      ],
      technicalStack: {
        'Technologies': ['React', 'Nodejs Express', 'Mongo DB'],
        'Outils': ['UML', 'GIT', 'GitHub'],
      },
    },
    {
      id: '11',
      company: 'ATOS',
      role: 'Développeur FULLSTACK (web/mobile)',
      location: 'Keur Gorgui, Dakar, Sénégal',
      startDate: '01-12-2018',
      endDate: '30-12-2019',
      projectDescription: 'Projets :\n• Gestion des collaborateurs d\'Atos\n• MYARM (Application portail d\'Atos)',
      missions: [
        'Implémentation des interfaces de l\'application web',
        'Implémentation des API sur la partie back end',
        'Implémentation des API coté front',
        'Création de la BD avec PostgreSQL',
        'Implémentation des API pour l\'envoi de sms ou email à partie du back end',
      ],
      technicalStack: {
        'Technologies': ['Angular', 'Ionic', 'JSF Servlet', 'Spring Boot', 'PostgreSQL', 'Hipster'],
        'Outils': ['UML', 'GIT', 'GitHub', 'Trello', 'Slack'],
        'Méthode': ['Scrum'],
      },
    },
  ])

  const education = ref<Education[]>([
    {
      id: '1',
      institution: 'Institut Supérieur Informatique (ISI)',
      degree: 'Master en Ingénierie Génie Logiciel (Bac+5)',
      field: 'Génie Logiciel',
      location: 'Dakar, Sénégal',
      startDate: '',
      endDate: '',
    },
    {
      id: '2',
      institution: 'Institut Supérieur Informatique (ISI)',
      degree: 'Licence Ingénierie Génie Logiciel (Bac+3)',
      field: 'Génie Logiciel',
      location: 'Dakar, Sénégal',
      startDate: '',
      endDate: '',
    },
    {
      id: '3',
      institution: 'Institut Supérieur Informatique (ISI)',
      degree: 'BTS en Informatique de gestion (Bac+2)',
      field: 'Informatique',
      location: 'Dakar, Sénégal',
      startDate: '',
      endDate: '',
    },
    {
      id: '4',
      institution: 'Institut Supérieur Informatique (ISI)',
      degree: 'DTS – Génie Logiciel (Bac+2)',
      field: 'Génie Logiciel',
      location: 'Dakar, Sénégal',
      startDate: '',
      endDate: '',
    },
    {
      id: '5',
      institution: 'Institut Supérieur Informatique (ISI)',
      degree: 'DTS - Réseaux Informatique (Bac+2)',
      field: 'Réseaux Informatique',
      location: 'Dakar, Sénégal',
      startDate: '',
      endDate: '',
    },
    {
      id: '6',
      institution: 'GROUPE SCOLAIRE EDUCAZUR',
      degree: 'Baccalauréat Série S2',
      field: 'Sciences',
      location: 'Sénégal',
      startDate: '',
      endDate: '',
    },
  ])

  const projects = ref<Project[]>([
    {
      id: '1',
      name: 'Plateforme SENCARTOUR',
      description: 'Plateforme de e-commerce pour l’entreprise de SENCARTOUR.',
      technologies: ['Laravel', 'PostgreSQL', 'MYSQL'],
      link: 'https://www.senecartours.sn/',
      startDate: '06/07/2022',
      endDate: '06/09/2022',
    },
    {
      id: '2',
      name: 'VISITE TECHNIQUE',
      description: 'Plateforme pour réserver une visite technique sans se déplacer du lieu de travaille.',
      technologies: ['Angular', 'Spring boot', 'PostgreSQL', 'MYSQL'],
      link: 'https://www.visitetechnique.com/',
      startDate: '11/03/2022',
      endDate: '06/07/2022',
    },
    {
      id: '3',
      name: 'Taxis à Nantes',
      description: 'Application web et mobile pour la gestion d\'une compagnie de Taxis à Nantes.',
      technologies: ['Laravel', 'Ionic', 'PostgreSQL', 'MYSQL'],
      link: 'https://www.taxis-nantes.com/',
      startDate: '01/04/2021',
      endDate: '06/07/2022',
    },
  ])

  const skills = ref({
    applicativeDevelopment: [
      'Microservice', 'SOA', 'Java', 'Spring Boot', 'Jakarta/JEE','Angular', 'React JS', 'Flutter', 'Laravel', 'Nodejs Express', 'Flutter/Dart', 'Python', 'PostgreSQL', 'MySQL', 'MongoDB',
    ],
    securityCloud: [
      'AWS', 'EC2', 'CloudWatch', 'RDS','Cloud Front', 'CloudFormation','CodePipeline','OpenShift',
      'Keycloak', 'Auth0',
    ],
    devOps: [
      'Docker', 'Kubernetes', 'Jenkins', 'Sonar', 'Git', 'GitHub',
      'Bitbucket', 'Git flow', 'CI/CD',
    ],
    methodology: [
      'Agile', 'Scrum', 'UML', 'Jira', 'Trello', 'Slack',
    ],
  })

  const languages = ref([
    { language: 'Français', comprehension: 'Courant', speaking: 'Courant', writing: 'Courant' },
    { language: 'Anglais', comprehension: 'Courant', speaking: 'Moyen', writing: 'Moyen' },
  ])

  const certifications = ref<Certification[]>([
    {
      id: '1',
      name: 'Spring -boot / Microservice',
      issuer: 'Udemy',
      issueDate: '',
      credentialUrl: 'https://www.udemy.com/certificate/UC-1c794007-209b-40a0-b221-9051262526e3/',
    },
    {
      id: '2',
      name: 'DevOps Certified',
      issuer: 'Unknown',
      issueDate: '',
      credentialUrl: 'https://www.linkedin.com/in/makhmadanelobb557a169/details/certifications/1730131951056/single-media-viewer/?profileId=ACoAACghDTkBRTBlQxVakDgLi5YQ5NUemDhY1L0',
    },
  ])

  const teaching = ref<Teaching[]>([
    {
      id: '1',
      institution: 'Institut Supérieur Informatique (ISI)',
      position: 'Formateur en (Analyste, Concepteur et Développeur d’application)',
      courses: [
        'Algorithme (Base et avancé)',
        'Langage C/C++ (Base/QT …)',
        'Java (Java FX -Java/SE – JSP/Servlet- ORM- JSP-Spring –Spring Boot …)',
        'PHP (Base-Webservice (Json-Soap) - MVC -ORM - Laravel – Symfony …)',
        'JavaScript (Base-JQuery-Ajax-Angular -React JS …)',
        'C# (WPF -CRYSTAL REPORT – WEB API - .NET CORE)',
        'CMS (Wordpress– Drupal …)',
        'Analyse (UML/MERISE/SGBD/SQL…)',
        'Bureautique (Word-Excel-Power Point)',
        'Design Pattern - Architecture des SI',
      ],
      startDate: '2019',
      endDate: 'Aujourd\'hui',
    },
    {
      id: '2',
      institution: 'Sup Info ',
      position: 'Formateur en (Analyste, Concepteur et Développeur d’application)',
      courses: [
        'Algorithme (Base et avancé)',
        'Langage C/C++ (Base/QT …)',
        'Java (Java FX -Java/SE – JSP/Servlet- ORM- JSP-Spring –Spring Boot …)',
        'PHP (Base-Webservice (Json-Soap) - MVC -ORM - Laravel – Symfony …)',
        'JavaScript (Base-JQuery-Ajax-Angular -React JS …)',
        'C# (WPF -CRYSTAL REPORT – WEB API - .NET CORE)',
        'CMS (Wordpress– Drupal …)',
        'Analyse (UML/MERISE/SGBD/SQL…)',
        'Bureautique (Word-Excel-Power Point)',
        'Design Pattern - Architecture des SI',
      ],
      startDate: '2019',
      endDate: 'Aujourd\'hui',
    },
    {
      id: '3',
      institution: 'ISM (Institut Supérieur de Management) ',
      position: 'Formateur en (Analyste, Concepteur et Développeur d’application)',
      courses: [
        'Algorithme (Base et avancé)',
        'Langage C/C++ (Base/QT …)',
        'Java (Java FX -Java/SE – JSP/Servlet- ORM- JSP-Spring –Spring Boot …)',
        'PHP (Base-Webservice (Json-Soap) - MVC -ORM - Laravel – Symfony …)',
        'JavaScript (Base-JQuery-Ajax-Angular -React JS …)',
        'C# (WPF -CRYSTAL REPORT – WEB API - .NET CORE)',
        'CMS (Wordpress– Drupal …)',
        'Analyse (UML/MERISE/SGBD/SQL…)',
        'Bureautique (Word-Excel-Power Point)',
        'Design Pattern - Architecture des SI',
      ],
      startDate: '2019',
      endDate: 'Aujourd\'hui',
    },
    {
      id: '4',
      institution: 'IIBS (Institut Informatique Business School)',
      position: 'Formateur en (Analyste, Concepteur et Développeur d’application)',
      courses: [
        'Algorithme (Base et avancé)',
        'Langage C/C++ (Base/QT …)',
        'Java (Java FX -Java/SE – JSP/Servlet- ORM- JSP-Spring –Spring Boot …)',
        'PHP (Base-Webservice (Json-Soap) - MVC -ORM - Laravel – Symfony …)',
        'JavaScript (Base-JQuery-Ajax-Angular -React JS …)',
        'C# (WPF -CRYSTAL REPORT – WEB API - .NET CORE)',
        'CMS (Wordpress– Drupal …)',
        'Analyse (UML/MERISE/SGBD/SQL…)',
        'Bureautique (Word-Excel-Power Point)',
        'Design Pattern - Architecture des SI',
      ],
      startDate: '2019',
      endDate: 'Aujourd\'hui',
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
