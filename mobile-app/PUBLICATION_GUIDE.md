# Guide de Publication - Google Play Store & App Store

## 🚀 Publication sur Google Play Store (Android)

### Prérequis
- Compte Google Play Developer (25€ unique)
- Application Expo configurée
- Images et assets (icône, screenshots, etc.)

### Méthode 1 : Build avec EAS (recommandé)

1. **Installer EAS CLI**
```bash
npm install -g eas-cli
```

2. **Se connecter à Expo**
```bash
eas login
```

3. **Configurer le projet**
```bash
cd mobile-app
eas build:configure
```

4. **Créer un build Android (APK ou AAB)**
```bash
# Pour un fichier AAB (recommandé pour le Play Store)
eas build --platform android

# Choisir "production" quand demandé
```

5. **Télécharger le fichier .aab** généré

### Méthode 2 : Build classique Expo

```bash
expo build:android -t app-bundle
```

### Publication sur Play Console

1. Aller sur https://play.google.com/console
2. Cliquer sur "Créer une application"
3. Remplir les informations :
   - **Nom** : Collège Révisions
   - **Langue par défaut** : Français
   - **Type** : Application
   - **Gratuit/Payant** : Gratuit

4. **Fiche du Store** :
   - Titre (max 50 caractères)
   - Description courte (max 80 caractères)
   - Description complète (max 4000 caractères)
   - Icône 512x512 pixels
   - Captures d'écran (minimum 2, recommandé 8)
   - Image principale 1024x500 pixels

5. **Télécharger l'AAB** dans "Production" > "Créer une version"

6. **Classification du contenu** :
   - Questionnaire sur le contenu
   - Pour une app éducative : généralement classée "Tout public"

7. **Prix et distribution** :
   - Sélectionner les pays
   - Confirmer que c'est gratuit

8. **Soumettre pour examen**

---

## 🍎 **iOS - Apple App Store**

### Prérequis
- Compte Apple Developer (99€/an)
- **Mac requis** pour certaines étapes
- Xcode installé (sur Mac)

### Étape 1 : Inscription Apple Developer

1. Aller sur https://developer.apple.com
2. S'inscrire au programme (99€/an)
3. Accepter les accords

### Étape 2 : Build avec EAS

```bash
# 1. Installer EAS CLI
npm install -g eas-cli

# 2. Se connecter
eas login

# 3. Build iOS
eas build --platform ios

# Suivre les instructions pour :
# - Créer un Bundle Identifier (ex: com.votreNom.collegerevisions)
# - Générer les certificats
```

### Étape 3 : App Store Connect

1. Aller sur https://appstoreconnect.apple.com
2. Cliquer sur "Mes apps" > "+"
3. Créer une nouvelle app :
   - **Nom** : Collège Révisions
   - **Langue principale** : Français
   - **Bundle ID** : celui créé lors du build
   - **SKU** : identifiant unique (ex: college-revisions-001)

4. **Informations de l'app** :
   - Catégorie : Éducation
   - Sous-catégorie : secondaire
   - Icône 1024x1024 pixels (sans transparence)
   - Captures d'écran iPhone (plusieurs tailles requises)
   - Captures d'écran iPad (optionnel)

5. **Description** :
   - Titre (max 30 caractères)
   - Sous-titre (max 30 caractères)
   - Description (max 4000 caractères)
   - Mots-clés (max 100 caractères)
   - URL du site web (optionnel)

6. **Télécharger le build** :
   - Le fichier .ipa est automatiquement uploadé par EAS
   - Ou utiliser Xcode/Transporter pour l'upload manuel

7. **Questionnaire sur l'app** :
   - Contenu (classification d'âge)
   - Confidentialité des données
   - Coordonnées de support

8. **Soumettre pour examen**

---

## 📋 **Assets nécessaires**

### Pour les deux stores

**Icône de l'app** :
- 1024x1024 pixels (format PNG)
- Sans coins arrondis, sans transparence
- Design simple et reconnaissable

**Captures d'écran** :
- Minimum 2-3 screenshots
- Montrant les fonctionnalités principales
- Android : 1080x1920 ou 1440x2560
- iOS : plusieurs tailles (iPhone 6.7", 6.5", 5.5")

**Images promotionnelles** :
- Google Play : 1024x500 pixels (image principale)
- App Store : optionnel

### Créer des captures d'écran

```bash
# Lancer l'app
npm start

# Utiliser l'émulateur ou un vrai appareil
# Prendre des screenshots des écrans principaux :
# - Écran d'accueil
# - Sélection des matières
# - Un cours ouvert
# - Un quiz en cours
# - Écran de résultats
```

---

## 💡 **Conseils pour la description**

### Description courte (80 caractères)
```
Révise Math, Français et Histoire-Géo avec des cours et quiz interactifs
```

### Description complète

```
📚 Collège Révisions - L'app pour réussir au collège !

Aide tes élèves à réviser efficacement avec cette application éducative
complète couvrant trois matières essentielles :

🧮 MATHÉMATIQUES
• Fractions et nombres décimaux
• Calcul littéral
• Aires et périmètres
• Pourcentages
• + de 12 quiz

📖 FRANÇAIS
• Classes grammaticales
• Conjugaison
• Orthographe et homophones
• Accord du participe passé
• + de 12 quiz

🌍 HISTOIRE-GÉOGRAPHIE
• De la Préhistoire aux Temps modernes
• Géographie de la France
• Union Européenne
• + de 12 quiz

✨ FONCTIONNALITÉS
✓ Cours complets avec exemples
✓ Quiz interactifs avec explications
✓ Feedback immédiat
✓ Résultats détaillés
✓ Interface intuitive et colorée
✓ Sans publicité
✓ Gratuit

Idéal pour les élèves de 6ème, 5ème, 4ème et 3ème !
```

---

## ⚡ **Alternative : Expo Application Services (EAS)**

C'est la méthode la plus simple et recommandée !

```bash
# Installation
npm install -g eas-cli

# Login
eas login

# Configuration
cd mobile-app
eas build:configure

# Build pour les deux plateformes
eas build --platform all

# Soumission automatique (optionnel)
eas submit --platform android
eas submit --platform ios
```

---

## 🔒 **Important : Politique de confidentialité**

Les deux stores exigent une politique de confidentialité. Vous devez :

1. Créer une page web avec votre politique
2. Indiquer quelles données sont collectées (ici : probablement aucune)
3. Ajouter le lien dans les informations de l'app

Exemple simple :
```
Cette application ne collecte aucune donnée personnelle.
Toutes les données sont stockées localement sur votre appareil.
```

---

## ⏱️ **Timeline estimée**

1. **Préparation des assets** : 2-4 heures
2. **Build de l'application** : 30 min - 2 heures
3. **Création des fiches store** : 1-2 heures
4. **Validation Google Play** : 1-3 jours
5. **Validation App Store** : 2-7 jours

**Total** : Environ 1 semaine du début à la publication

---

## 💰 **Coûts récapitulatifs**

- Google Play : 25€ (une seule fois)
- Apple App Store : 99€/an
- **TOTAL première année** : 124€
- **Années suivantes** : 99€/an (uniquement Apple)

---

## 🎯 **Recommandation**

Si c'est votre première publication :
1. **Commencez par Android** (moins cher, plus simple)
2. Testez avec des élèves
3. Récoltez des retours
4. Publiez ensuite sur iOS si besoin

Besoin d'aide pour créer les assets ou remplir les fiches des stores ?
