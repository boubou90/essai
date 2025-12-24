# 📚 Collège Révisions - Application Mobile

Une application mobile éducative pour les collégiens permettant de réviser leurs cours et de s'entraîner avec des quiz dans trois matières principales : **Mathématiques**, **Français** et **Histoire-Géographie**.

## 🎯 Fonctionnalités

- **Révision des cours** : Accès à des fiches de cours structurées avec points clés et exemples
- **Quiz interactifs** : Questions à choix multiples avec explications détaillées
- **Trois matières** : Mathématiques, Français, Histoire-Géographie
- **Résultats détaillés** : Suivi des performances avec encouragements personnalisés
- **Interface intuitive** : Design moderne et adapté aux collégiens
- **Compatible Android & iOS** : Une seule application pour les deux plateformes

## 📱 Technologies utilisées

- **React Native** avec **Expo** : Framework cross-platform
- **React Navigation** : Navigation entre les écrans
- **Expo Linear Gradient** : Dégradés visuels attractifs

## 🚀 Installation et lancement

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI

### Étapes d'installation

1. **Installer Expo CLI** (si ce n'est pas déjà fait) :
```bash
npm install -g expo-cli
```

2. **Aller dans le répertoire du projet** :
```bash
cd mobile-app
```

3. **Installer les dépendances** :
```bash
npm install
```

4. **Lancer l'application** :
```bash
npm start
# ou
expo start
```

### Tester sur votre appareil

#### Option 1 : Sur smartphone (Android ou iOS)

1. Installez l'application **Expo Go** depuis le Play Store (Android) ou App Store (iOS)
2. Scannez le QR code affiché dans le terminal avec :
   - Android : l'application Expo Go
   - iOS : l'appareil photo natif

#### Option 2 : Sur émulateur

- **Android** :
```bash
npm run android
```

- **iOS** (Mac uniquement) :
```bash
npm run ios
```

#### Option 3 : Dans le navigateur web
```bash
npm run web
```

## 📂 Structure du projet

```
mobile-app/
├── App.js                    # Point d'entrée de l'application
├── app.json                  # Configuration Expo
├── package.json              # Dépendances
├── screens/                  # Écrans de l'application
│   ├── HomeScreen.js        # Écran d'accueil
│   ├── SubjectsScreen.js    # Choix de la matière
│   ├── CourseScreen.js      # Affichage des cours
│   ├── QuizScreen.js        # Quiz interactif
│   └── ResultsScreen.js     # Résultats du quiz
└── data/                     # Données de contenu
    ├── coursesData.js       # Contenu des cours
    └── quizData.js          # Questions de quiz
```

## 🎨 Captures d'écran

L'application comprend :
- **Écran d'accueil** : Boutons pour réviser ou faire un quiz
- **Sélection de matière** : Choix entre Math, Français, Histoire-Géo
- **Cours** : Fiches dépliables avec points clés et exemples
- **Quiz** : Questions avec feedback immédiat
- **Résultats** : Score, pourcentage et détails des réponses

## 📚 Contenu pédagogique

### Mathématiques
- Les fractions
- Les nombres décimaux
- Le calcul littéral
- Les aires et périmètres
- Les pourcentages

### Français
- Les classes grammaticales
- Le présent de l'indicatif
- L'accord du participe passé
- Les homophones grammaticaux
- Les types de phrases

### Histoire-Géographie
- La Préhistoire
- L'Antiquité
- Le Moyen Âge
- Les Temps modernes
- La géographie de la France
- L'Union Européenne

## 🔧 Personnalisation

### Ajouter du contenu

Pour ajouter de nouveaux cours ou questions :

1. **Cours** : Éditez `data/coursesData.js`
2. **Quiz** : Éditez `data/quizData.js`

Format d'un cours :
```javascript
{
  title: "Titre du cours",
  content: "Contenu principal...",
  keyPoints: ["Point 1", "Point 2", "Point 3"],
  examples: ["Exemple 1", "Exemple 2"]
}
```

Format d'une question :
```javascript
{
  question: "Question ?",
  answers: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
  correctAnswer: 0, // Index de la bonne réponse (0 = A, 1 = B, etc.)
  explanation: "Explication de la réponse..."
}
```

## 📦 Build pour production

### Android (APK)
```bash
expo build:android
```

### iOS (IPA - nécessite un compte développeur Apple)
```bash
expo build:ios
```

### Publication sur les stores

Suivez la [documentation Expo](https://docs.expo.dev/distribution/introduction/) pour publier votre application.

## 🤝 Contribution

Cette application est conçue pour être facilement extensible. Vous pouvez :
- Ajouter de nouvelles matières
- Enrichir le contenu existant
- Améliorer l'interface utilisateur
- Ajouter de nouvelles fonctionnalités (statistiques, progression, etc.)

## 📄 Licence

Ce projet est libre d'utilisation pour un usage éducatif.

## ✨ Améliorations futures possibles

- Sauvegarde des scores et progression
- Système de niveaux (6ème, 5ème, 4ème, 3ème)
- Mode hors ligne complet
- Partage des résultats
- Ajout de nouvelles matières (SVT, Physique-Chimie, etc.)
- Statistiques détaillées
- Mode révision avec cartes mémoire (flashcards)

---

Créé avec ❤️ pour les collégiens
