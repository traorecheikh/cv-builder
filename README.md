# CV Builder & Portfolio Professionnel

![Nuxt 3](https://img.shields.io/badge/Nuxt-3.13-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Ce projet est une application web moderne de type Portfolio et CV Builder, conçue pour présenter un profil professionnel IT de haut niveau, gérer des articles techniques et permettre la génération dynamique de CV au format PDF.

Développée avec une architecture robuste basée sur **Nuxt 3**, elle intègre les meilleures pratiques de développement web : performance (Lighthouse), SEO, accessibilité et maintenabilité.

## 🚀 Fonctionnalités Clés

- **Portfolio Interactif** : Présentation dynamique des projets et compétences.
- **CV Builder** : Génération de CV au format PDF à la volée (via `jspdf` et `html2canvas`).
- **Blog Technique** : Système de gestion d'articles (support Markdown).
- **Contact & Emailing** : Formulaire de contact fonctionnel avec `nodemailer`.
- **Mode Sombre/Clair** : Support natif du thémage.
- **Performance** : Optimisation des images (`nuxt-image`, scripts dédiés), préchargement des polices.

## 🛠 Stack Technique

- **Framework Frontend** : [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API).
- **Langage** : TypeScript.
- **Styles** : Tailwind CSS (Architecture utilitaire).
- **Gestion d'état** : Pinia.
- **Backend / CMS** : Intégration Strapi (via `@nuxtjs/strapi`).
- **Outils** :
  - `eslint` + `prettier` pour la qualité du code.
  - `lucide-vue-next` pour les icônes.
  - `imagemin` pour l'optimisation des assets.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir l'environnement suivant :

- **Node.js** : v20.19.0 ou supérieur (recommandé : v22+).
- **Gestionnaire de paquets** : `npm` ou `pnpm`.

## ⚙️ Installation

1. **Cloner le dépôt** :
   ```bash
   git clone <votre-repo-url>
   cd cv-builder
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configuration de l'environnement** :
   Dupliquez le fichier `.env.example` en `.env` et configurez les variables :
   ```bash
   cp .env.example .env
   ```
   *Voir la section [Configuration](#-configuration) pour les détails.*

## 🚀 Démarrage

### Environnement de Développement
Pour lancer le serveur de développement avec rechargement à chaud (HMR) :
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

### Production
Pour construire l'application pour la production :
```bash
npm run build
```
Pour prévisualiser le build localement :
```bash
npm run preview
```

## 🔧 Scripts Utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement. |
| `npm run build` | Compile l'application pour la production. |
| `npm run generate` | Génère une version statique du site. |
| `npm run optimize:images` | Exécute le script d'optimisation des images (assets). |
| `npm run dev:backend` | Raccourci pour lancer le backend Strapi (si local). |

## 🔐 Configuration

Le fichier `.env` pilote la configuration de l'application. Voici les variables principales :

```ini
# API Strapi
STRAPI_URL=https://votre-instance-strapi.com

# Configuration SMTP (Envoi d'emails)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=votre-email@example.com
SMTP_PASS=votre-mot-de-passe
CONTACT_RECEIVER=email-de-reception@example.com
```

## 📂 Structure du Projet

L'architecture suit les conventions Nuxt 3 :

```
cv-builder/
├── assets/          # Fichiers statiques (CSS, Images non-optimisées)
├── components/      # Composants Vue réutilisables
│   ├── ui/          # Composants d'interface atomiques (Boutons, Badges...)
│   └── ...
├── composables/     # Logique métier partagée (Hooks)
├── layouts/         # Mises en page globales
├── pages/           # Routes de l'application (File-based routing)
├── public/          # Fichiers publics servis tels quels (Favicon, Robots.txt)
├── server/          # API Server-side (Nitro)
├── stores/          # Stores Pinia (Gestion d'état)
├── utils/           # Fonctions utilitaires
└── nuxt.config.ts   # Configuration principale
```

## 🤝 Contribution

Les contributions sont les bienvenues pour améliorer ce portfolio professionnel.

1. **Convention de Commits** : Nous suivons la convention [Conventional Commits](https://www.conventionalcommits.org/).
   - `feat:` : Nouvelle fonctionnalité
   - `fix:` : Correction de bug
   - `docs:` : Documentation
   - `style:` : Formatage, CSS
   - `refactor:` : Refactorisation du code

2. **Branching** : Créez une branche pour chaque fonctionnalité (`git checkout -b feature/ma-feature`).

## 📄 Licence

Ce projet est sous licence privée. Tous droits réservés.
Copyright © 2026 Makhmadane LO.
