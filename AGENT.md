# Générateur de CV - Specification du Projet

## Aperçu du Projet
**Étape 1 : Page Portfolio Statique avec Téléchargement de CV Dynamique**

Un site portfolio moderne et professionnel pour Cheikh Ahmed Tijani Traore qui met en avant son profil professionnel avec la possibilité de télécharger un CV généré dynamiquement dans les modèles sélectionnés par l'utilisateur. Le site privilégie un design épuré, l'accessibilité et la présentation professionnelle.

---

## Identité de Marque & Palette de Couleurs

### Couleurs Primaires
- **Couleur Principale 1** : `#1171B8` (Bleu Professionnel - Accent primaire)
- **Couleur Principale 2** : `#E64922` (Orange Énergique - Appels à l'action, mises en avant)

### Couleurs Secondaires
- **Couleur Secondaire 1** : `#FFFFFF` (Blanc - Fond, clarté)
- **Couleur Secondaire 2** : `#000000` (Noir - Texte, contraste)

### Palette de Support (Dérivée des Primaires)
- **Bleu Clair** : `#E8F1F8` (Accent de fond, états survolés)
- **Gris Foncé** : `#2C3E50` (Texte secondaire, contraste subtil)
- **Gris Clair** : `#F5F7FA` (Bordures, séparateurs)
- **Vert de Succès** : `#27AE60` (Badges de réussite, positivité)

---

## Principes de Design Moderne & Lois UX/UI

### 1. **Application de la Théorie des Couleurs**
- **Bleu Primaire (#1171B8)** : Confiance, professionnalisme, stabilité - parfait pour un professionnel tech
- **Orange (#E64922)** : Énergie, action, urgence - utilisé stratégiquement pour les CTAs (Télécharger CV, Contact)
- **Blanc/Noir** : Contraste maximal pour l'accessibilité (minimum WCAG AA)
- **Équilibre Complémentaire** : Bleu et orange sont quasi-complémentaires, créant de l'intérêt visuel sans surcharge
- **Contrôle de la Saturation** : Éviter les variantes fluorescentes ou sursaturées ; maintenir un ton professionnel

### 2. **Hiérarchie Visuelle**
- H1 : 2.5rem - 3rem (Titres de page, section héro)
- H2 : 2rem - 2.5rem (Titres de section)
- H3 : 1.5rem (Titres de sous-section)
- Corps du texte : 1rem (16px) - Lisibilité optimale
- Petit : 0.875rem (14px) - Métadonnées, horodatages
- **Hauteur de ligne** : 1.6 pour le corps du texte (lisibilité optimale)

### 3. **Principes de la Gestalt**
- **Proximité** : Regrouper les informations connexes (titre du poste + entreprise + dates)
- **Continuité** : Expérience de défilement fluide, espacement cohérent
- **Similitude** : Éléments similaires stylisés identiquement (cartes d'expérience, badges de compétences)
- **Fermeture** : Cartes avec bordures subtiles suggérant un contenu délimité

### 4. **Espace Blanc (Espace Négatif)**
- Marges et rembourrage généreux préviennent la surcharge cognitive
- Rembourrage minimum : 1.5rem, maximum : 3rem entre sections
- Aucune mise en page comprimée ; l'espace vital améliore la lisibilité de 20-30%

### 5. **Accessibilité (WCAG 2.1 AA)**
- Ratio de contraste des couleurs minimum 4.5:1 pour le texte (Bleu #1171B8 sur blanc testé)
- Navigation au clavier entièrement supportée
- HTML sémantique (nav, main, section, article)
- Étiquettes ARIA pour le contenu dynamique
- Indicateurs de focus visibles (contour solide de 2px)

### 6. **Typographie**
- **Famille de Polices** : `Inter` ou `Segoe UI` (moderne, professionnel, très lisible)
- **Poids des Polices** : 400 (Régulier), 500 (Moyen), 600 (Semi-gras), 700 (Gras)
- **Longueur de Ligne** : 45-75 caractères pour une lisibilité optimale
- **Empilement de Secours** : Pile de polices système pour les performances

### 7. **Motif de Lecture F et Z**
- Section héro en haut (ancrage visuel)
- Navigation suit le motif F (balayage horizontal en haut, puis vertical)
- Sections d'expérience utilisent le motif Z vertical (titre → date → description)

### 8. **Lois du Mouvement de Newton (Micro-interactions)**
- Transitions fluides : 200-300ms pour les états survolés
- Aucun mouvement soudain ; toutes les animations suivent des courbes d'accélération
- Accélération à l'entrée, décélération à la sortie (cubic-bezier préféré)

### 9. **Loi de Miller (Charge Cognitive)**
- Maximum 7±2 éléments de navigation
- Informations divisées en 5-7 sections principales
- Éviter la surcharge informationnelle ; utiliser les sections réductibles si nécessaire

### 10. **Loi de Hick (Complexité de la Décision)**
- Appel à l'action primaire clair : "Télécharger CV"
- CTAs secondaires minimisés et clairement secondaires
- Anxiété réduite grâce à un design minimaliste

### 11. **Loi de Fitts (Conception des Interactions)**
- CTAs minimum 48px × 48px cible tactile
- Boutons critiques (Télécharger) proéminents et facilement accessibles
- Zones de survol généreuses pour les utilisateurs de souris

### 12. **Effet Von Restorff (Distinctivité Visuelle)**
- Le bouton Télécharger se démarque en orange (#E64922) sur les fonds bleu/blanc
- Les badges de réussite utilisent des couleurs de support pour attirer l'attention
- Aucune information ne rivalise avec le contenu principal

### 13. **Contraste & Emphase Visuelle**
- Texte primaire : #2C3E50 (97% noir, pas pur noir pour le confort d'écran)
- Texte secondaire : #7F8C8D (gris professionnel)
- Liens : #1171B8 avec soulignement au survol
- Boutons : #E64922 avec ombre pour la profondeur

### 14. **Tendances de Design Moderne**
- **Minimalisme** : Éléments essentiels uniquement ; aucun encombrement décoratif
- **Design Plat** : Fonds monochromes, ombres subtiles pour la profondeur
- **Micro-interactions** : Effets de survol fluides, états de chargement
- **Mise en Page par Cartes** : Contenu organisé en sections distinctes et lisibles
- **Design Réactif** : Approche mobile-first (minimum 320px)

### 15. **Système de Grille & Mise en Page**
- Grille 12 colonnes (réactive : 4 colonnes mobile, 8 tablette, 12 bureau)
- Échelle d'espacement cohérente : unité de base 4px (4, 8, 12, 16, 20, 24, 32, 40, 48px)
- Largeur maximale du contenu : 1200px avec conteneur centré

---

## Structure du Site

### Pages
1. **Accueil/Héro** (Aperçu du Portfolio)
2. **Expérience** (Chronologie de Carrière)
3. **Éducation** (Formation Académique)
4. **Compétences** (Compétences Techniques)
5. **Projets** (Vitrine du Portfolio)
6. **Télécharger CV** (Modale avec Sélection de Modèle)

### Navigation
- En-tête fixe ou collant avec défilement fluide
- Navigation : Accueil | Expérience | Éducation | Compétences | Projets | (CV)
- Menu hamburger mobile (réductible)

---

## Fonctionnalités de Téléchargement du CV

### Étape 1 - CV Statique avec Modèles Sélectionnés par l'Utilisateur
- **Options de Modèle** :
  1. Moderne (Contemporain, minimaliste, thème bleu/orange)
  2. Classique (Traditionnel, professionnel, épuré)
  3. Optimisé ATS (Convivial pour les systèmes de suivi des candidatures)
  4. Créatif (Intensif en graphiques, basé sur des éléments visuels)

- **Format** : Export PDF
- **Interaction Utilisateur** : 
  - Cliquer sur le bouton "Télécharger CV"
  - La modale s'ouvre avec des aperçus de modèles
  - Sélectionner le modèle préféré
  - PDF génère et télécharge

### Sections de Contenu (Dynamiques) :
- Informations Personnelles
- Résumé Professionnel
- Expérience Professionnelle
- Éducation
- Compétences Linguistiques
- Compétences Techniques
- Projets & Réalisations

---

## Stack Technique

### Frontend
- **Framework** : Vue 3 (Composition API)
- **Style** : Tailwind CSS
- **Génération PDF** : jsPDF + HTML2Canvas
- **Icônes** : Lucide Vue (minimaliste, moderne)
- **Animations** : Vue Transition/Teleport (subtiles, professionnelles)

### Backend (Si Nécessaire)
- **Langage** : Node.js + Express (génération de CV sans état)
- **Génération PDF** : Backend (pdfkit ou Chrome sans interface)

### Hébergement
- **Déploiement** : Vercel, Netlify ou GitHub Pages
- **CDN** : Automatique via plateforme

---

## Spécifications de Design Visuel

### Règles d'Utilisation des Couleurs
- **Bleu Primaire (#1171B8)** : Liens, accents, séparateurs de section, état survolé des boutons principaux
- **Orange (#E64922)** : Boutons CTA principaux, mises en avant de réalisations, badges importants
- **Blanc (#FFFFFF)** : Fond primaire, fonds de cartes, texte sur fonds sombres
- **Noir (#000000)** : Couleur du texte primaire (97% opaque : #2C3E50 pour le confort d'écran)
- **Gris Clair (#F5F7FA)** : Fonds de section, bordures, séparateurs subtils
- **Gris Foncé (#2C3E50)** : Texte secondaire, horodatages, métadonnées

### Éléments à Éviter Absolument
- ❌ Dégradés (sauf extrêmement subtils, max 2 couleurs, 30° d'angle)
- ❌ Couleurs néon ou fluorescentes
- ❌ Animations excessives (pas de parallaxe, pas de vidéos auto-jouées)
- ❌ Comic Sans, Papyrus ou similaires (utiliser des polices modernes)
- ❌ Ombres portées plus grandes que 4px de rayon de flou
- ❌ Texte clignotant ou éléments en flash
- ❌ Trop de tailles de police (max 5 différentes)
- ❌ Texte centré du corps (rend la lecture difficile)

### Éléments de Design Requis
- ✅ Ombres de boîte subtiles (max 0 2px 4px rgba(0,0,0,0.1))
- ✅ Coins arrondis (4px-8px, cohérents)
- ✅ Espacement cohérent (base de grille 4px)
- ✅ États de focus pour tous les éléments interactifs
- ✅ États de chargement pour les opérations asynchrones
- ✅ États vides avec messages utiles
- ✅ Indices d'info-bulle pour les interactions complexes

---

## Exigences de Performance
- **Temps de Chargement de Page** : < 3 secondes sur 3G
- **Score Lighthouse** : 90+ (Performance, Accessibilité, Meilleures Pratiques)
- **Web Vitals** :
  - LCP (Plus Grand Contenu Peint) : < 2.5s
  - FID (Délai Première Entrée) : < 100ms
  - CLS (Décalage Cumulatif de Mise en Page) : < 0.1
  - TTI (Temps d'Interaction) : < 3.8s

---

## Points d'Arrêt Réactifs
- **Mobile** : 320px - 640px (focus principal)
- **Tablette** : 641px - 1024px
- **Bureau** : 1025px - 1920px
- **Grand Bureau** : 1921px+

---

## Liste de Vérification d'Accessibilité
- ✅ HTML5 sémantique
- ✅ Étiquettes ARIA où nécessaire
- ✅ Navigation au clavier (Tab, Entrée, Échap)
- ✅ Contraste des couleurs minimum 4.5:1
- ✅ Indicateurs de focus visibles
- ✅ Étiquettes de formulaire associées aux entrées
- ✅ Texte alternatif pour les images
- ✅ Testé avec lecteur d'écran
- ✅ Mobile tactile convivial (cibles minimum 48px)

---

## Stratégie de Contenu
- **Ton** : Professionnel, confiant, mais abordable
- **Langue** : Français (principal) avec support anglais
- **Voix** : Première personne, voix active (éviter la voix passive)
- **Point Fort** : Expertise technique + Leadership + Innovation

---

## Métriques de Succès
- La réactivité mobile fonctionne sur tous les appareils
- Le téléchargement du CV se termine en < 2 secondes
- La page a un score Lighthouse de 90+
- Zéro erreur dans la console
- Aucune incohérence de design
- Accessible aux lecteurs d'écran
- L'apparence professionnelle correspond à l'identité de marque

---

## Livrables
1. ✅ Page d'accueil du portfolio réactive
2. ✅ Section chronologie d'expérience
3. ✅ Section éducation
4. ✅ Vitrine de compétences
5. ✅ Portfolio de projets
6. ✅ Modale de téléchargement de CV avec sélection de modèle
7. ✅ Génération et téléchargement de PDF
8. ✅ Navigation accessible
9. ✅ Design optimisé pour mobile
10. ✅ Performance optimisée

---

**Philosophie de Design** : « La forme suit la fonction. Chaque choix de design a un objectif. Aucun élément décoratif sans utilité. Moderne, minimaliste et respectueusement frappant. »
