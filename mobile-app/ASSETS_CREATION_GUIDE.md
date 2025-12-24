# Guide de Création des Assets Visuels 🎨

## 🎯 Assets nécessaires

### Pour les deux stores :
- ✅ Icône 1024x1024 px (PNG, sans transparence pour iOS)
- ✅ 4-8 captures d'écran
- ✅ Image principale Google Play 1024x500 px (optionnel)

---

## 📱 MÉTHODE 1 : Créer l'icône avec Canva (GRATUIT & FACILE)

### Étape par étape :

1. **Aller sur Canva**
   - https://www.canva.com (gratuit)
   - Créer un compte si nécessaire

2. **Créer un design**
   - Cliquer sur "Créer un design"
   - Choisir "Dimensions personnalisées"
   - Entrer : **1024 x 1024 px**

3. **Design de l'icône - Option A : Simple**
   ```
   Fond : Dégradé bleu (#4A90E2 vers #2E5F8F)
   Texte : "CR" en blanc, grande taille, police moderne (Montserrat Bold)
   Emoji : 📚 ou 🎓 en haut
   ```

4. **Design de l'icône - Option B : Détaillée**
   ```
   Fond : Dégradé bleu
   Éléments :
   - 🧮 en haut à gauche (Math)
   - 📖 en haut à droite (Français)
   - 🌍 en bas (Histoire-Géo)
   - Texte "CR" au centre
   ```

5. **Design de l'icône - Option C : Professionnelle**
   ```
   Fond : Bleu uni (#4A90E2)
   Un livre ouvert stylisé (chercher dans les éléments Canva)
   Étoiles ou points autour
   Pas de texte (plus universel)
   ```

6. **Télécharger**
   - Cliquer sur "Partager" > "Télécharger"
   - Format : **PNG**
   - Qualité : Recommandée
   - Pour iOS : Sauvegarder **sans transparence** (fond blanc ou coloré)

### Ressources Canva gratuites :
- Chercher "education icon"
- Chercher "book icon"
- Chercher "graduation icon"
- Utiliser les dégradés dans "Couleur de fond"

---

## 🖼️ MÉTHODE 2 : Créer l'icône avec Figma (GRATUIT & PROFESSIONNEL)

1. **Aller sur Figma**
   - https://www.figma.com
   - Créer un compte gratuit

2. **Nouveau fichier**
   - Créer un Frame : **1024 x 1024**

3. **Design suggéré**
   - Rectangle avec coins arrondis (rayon: 180px)
   - Remplissage : Dégradé linéaire
     - Couleur 1 : #4A90E2
     - Couleur 2 : #2E5F8F
   - Ajouter du texte "CR" centré
   - Ajouter des icônes (plugin "Iconify")

4. **Export**
   - Sélectionner le Frame
   - Export : PNG, 1x, transparent (Android) et sans transparent (iOS)

---

## 📸 CRÉER LES SCREENSHOTS

### Option 1 : Depuis l'émulateur (RECOMMANDÉ)

#### Sur Android :
```bash
# 1. Lancer l'app
cd mobile-app
npm start

# 2. Appuyer sur 'a' pour ouvrir sur Android
# 3. Dans l'émulateur, prendre des screenshots :
#    - Utiliser le bouton caméra de l'émulateur
#    - Ou Cmd+S (Mac) / Ctrl+S (Windows)
```

#### Sur iPhone (Simulateur iOS) :
```bash
# 1. Lancer l'app
npm start

# 2. Appuyer sur 'i' pour ouvrir sur iOS
# 3. Prendre des screenshots :
#    - Cmd+S dans le simulateur
#    - Les fichiers sont sur le Bureau
```

### Option 2 : Sur un vrai appareil

1. **Installer Expo Go** sur votre smartphone
   - Android : Play Store
   - iOS : App Store

2. **Lancer l'app**
```bash
npm start
# Scanner le QR code avec Expo Go
```

3. **Prendre les screenshots**
   - Android : Power + Volume bas
   - iOS : Power + Volume haut

### Screenshots à prendre (dans cet ordre) :

1. **Écran d'accueil** 🏠
   - Dès le lancement
   - Montre le titre et les boutons principaux

2. **Sélection des matières** 📚
   - Cliquer sur "Commencer à réviser"
   - Montre les 3 matières

3. **Cours ouvert** 📖
   - Cliquer sur "Mathématiques"
   - Ouvrir "Les fractions"
   - Screenshot avec le contenu visible

4. **Quiz - Question** ✏️
   - Revenir en arrière
   - Cliquer sur "Faire un quiz"
   - Choisir "Mathématiques"
   - Screenshot d'une question avec les réponses

5. **Quiz - Réponse correcte** ✅
   - Répondre à une question (bonne réponse)
   - Screenshot avec l'explication verte

6. **Résultats** 🎯
   - Finir le quiz
   - Screenshot de l'écran de résultats avec le score

7. **Cours avec points clés** 💡
   - Retourner aux cours
   - Ouvrir un cours montrant les "Points clés" en surbrillance

8. **Navigation** (optionnel)
   - Screenshot montrant le header avec le bouton retour

---

## 🎨 AMÉLIORER LES SCREENSHOTS

### Avec un éditeur (optionnel mais recommandé) :

**Option A : Mockup en ligne (gratuit)**
1. Aller sur https://mockuphone.com
2. Uploader vos screenshots
3. Choisir un modèle de téléphone
4. Télécharger le résultat avec le "cadre" du téléphone

**Option B : Ajouter du texte explicatif**
1. Ouvrir dans Canva
2. Ajouter du texte en haut :
   - "Révise tes cours facilement"
   - "Quiz interactifs"
   - "Suis ta progression"
3. Export en PNG

### Tailles requises :

#### Android (Google Play) :
- **Téléphones** : 1080 x 1920 px ou 1080 x 2340 px
- **Tablettes 7"** : 1200 x 1920 px (optionnel)
- Minimum : 2 screenshots
- Recommandé : 4-8 screenshots

#### iOS (App Store) :
- **iPhone 6.7"** (iPhone 14 Pro Max, 15 Pro Max) : 1290 x 2796 px
- **iPhone 6.5"** (iPhone 11 Pro Max, XS Max) : 1242 x 2688 px
- **iPhone 5.5"** (iPhone 8 Plus) : 1242 x 2208 px
- Minimum : 1 jeu de screenshots par taille
- Recommandé : 4-10 screenshots par taille

**Astuce** : Prenez les screenshots sur l'émulateur le plus grand possible, ils seront redimensionnés automatiquement.

---

## 🖼️ IMAGE PRINCIPALE GOOGLE PLAY (1024x500)

### Avec Canva :

1. **Nouveau design** : 1024 x 500 px

2. **Composition suggérée** :
   ```
   Gauche (40%) :
   - Fond bleu dégradé
   - Texte "Collège Révisions"
   - Sous-texte "Math • Français • Histoire-Géo"

   Droite (60%) :
   - Mockup de smartphone avec un screenshot de l'app
   - Ou les 3 emojis : 🧮 📖 🌍
   ```

3. **Télécharger** en PNG

**Alternative simple** :
- Fond bleu avec dégradé
- Texte "Révise Malin avec Collège Révisions"
- Emojis des 3 matières
- Pas de smartphone nécessaire

---

## ✅ CHECKLIST FINALE

### Avant de commencer :

- [ ] J'ai Canva ou Figma ouvert
- [ ] J'ai lancé l'app (`npm start`)
- [ ] J'ai un émulateur ou téléphone prêt

### Icône :

- [ ] Créée en 1024x1024 px
- [ ] Version avec fond (pour iOS)
- [ ] Version transparente (pour Android)
- [ ] Sauvegardée en PNG
- [ ] Design simple et reconnaissable

### Screenshots :

- [ ] Écran d'accueil
- [ ] Sélection des matières
- [ ] Cours ouvert
- [ ] Quiz - Question
- [ ] Quiz - Bonne réponse
- [ ] Résultats
- [ ] (Optionnel) 2 screenshots bonus

### Image principale (Google Play) :

- [ ] 1024x500 px
- [ ] Format PNG
- [ ] Texte lisible
- [ ] Design attractif

---

## 🎯 TEMPLATES PRÊTS À L'EMPLOI

### Template texte pour Canva (Icône) :

```
Dimensions : 1024 x 1024 px

Fond :
- Type : Dégradé linéaire
- Angle : 135°
- Couleur 1 : #4A90E2
- Couleur 2 : #2E5F8F

Texte :
- "CR"
- Police : Montserrat Extra Bold
- Taille : 320
- Couleur : #FFFFFF
- Position : Centré

Emoji :
- 📚
- Taille : 180
- Position : Au-dessus du texte
```

### Template texte pour l'image principale :

```
Dimensions : 1024 x 500 px

Zone gauche (0-400px) :
- Fond : #4A90E2
- Titre : "Collège Révisions"
  - Police : Montserrat Bold, 48px, blanc
- Sous-titre : "Cours et Quiz"
  - Police : Montserrat Regular, 28px, blanc 80%
- Emojis : 🧮 📖 🌍 (taille 40, espacés)

Zone droite (400-1024px) :
- Fond : Dégradé vers #2E5F8F
- Image mockup smartphone (optionnel)
- Ou illustration éducation
```

---

## 💡 RESSOURCES GRATUITES

### Icônes et illustrations :
- **Flaticon** : https://www.flaticon.com (icônes gratuites)
- **unDraw** : https://undraw.co (illustrations SVG)
- **Noun Project** : https://thenounproject.com

### Mockups de smartphones :
- **MockuPhone** : https://mockuphone.com
- **Mockup World** : https://www.mockupworld.co

### Polices modernes et gratuites :
- Montserrat (dans Canva et Google Fonts)
- Poppins (moderne, ronde)
- Roboto (classique, lisible)
- Inter (très populaire pour les apps)

### Palettes de couleurs :
Couleurs de l'app :
- Bleu principal : #4A90E2
- Bleu foncé : #2E5F8F
- Vert : #27AE60
- Rouge : #FF6B6B
- Turquoise : #4ECDC4

---

## 🚀 ORDRE RECOMMANDÉ

1. **Icône** (30 min)
   - Plus important
   - Utilisé partout

2. **Screenshots** (45 min)
   - Prendre tous les screenshots d'un coup
   - Pendant que l'app est lancée

3. **Image principale** (30 min - optionnel)
   - Seulement pour Google Play
   - Peut être fait après

**Total** : ~2 heures pour tous les assets ✅

---

## ❓ BESOIN D'AIDE ?

Si vous avez des questions :
1. L'icône peut être très simple : fond bleu + emoji 📚
2. Les screenshots peuvent être bruts (sans cadre)
3. L'image principale est optionnelle au début

**L'essentiel** :
- ✅ Une icône reconnaissable
- ✅ 4-6 screenshots clairs

Le reste peut être amélioré lors des mises à jour !

---

Bonne création ! 🎨✨
