# 🚀 Guide de Démarrage Rapide - VS Code

## Ouvrir le projet

### Méthode 1 : Depuis le terminal
```bash
cd /home/user/essai/mobile-app
code .
```

### Méthode 2 : Depuis VS Code
1. Ouvrir VS Code
2. File > Open Folder
3. Naviguer vers : `/home/user/essai/mobile-app`
4. Cliquer "Open"

---

## ✅ Vérifier que tout est prêt

### 1. Installer les dépendances (si pas encore fait)
```bash
npm install
```

### 2. Vérifier que tout fonctionne
```bash
npm start
```

Vous devriez voir :
```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web
```

---

## 🎯 Prochaines étapes

### Option A : Tester l'application
```bash
# Lancer l'app
npm start

# Puis appuyer sur :
# - 'a' pour Android
# - 'i' pour iOS (Mac seulement)
# - 'w' pour Web
```

### Option B : Créer les assets pour publication
1. Lire `QUICK_START_ASSETS.md`
2. Créer l'icône (10 min)
3. Prendre les screenshots (15 min)

### Option C : Modifier le contenu
**Fichiers à éditer** :
- `data/coursesData.js` - Ajouter/modifier des cours
- `data/quizData.js` - Ajouter/modifier des questions
- `screens/` - Modifier l'interface

---

## 📁 Structure du projet

```
mobile-app/
├── App.js                 # Point d'entrée
├── package.json           # Dépendances
├── screens/               # Les 5 écrans
│   ├── HomeScreen.js
│   ├── SubjectsScreen.js
│   ├── CourseScreen.js
│   ├── QuizScreen.js
│   └── ResultsScreen.js
├── data/                  # Contenu pédagogique
│   ├── coursesData.js
│   └── quizData.js
└── [guides de publication]

```

---

## 🛠️ Commandes utiles

### Développement
```bash
npm start              # Lancer l'app
npm run android        # Lancer sur Android
npm run ios            # Lancer sur iOS
npm run web            # Lancer en mode web
```

### Build pour publication
```bash
npm install -g eas-cli  # Installer EAS CLI
eas login              # Se connecter
eas build --platform android  # Build Android
eas build --platform ios      # Build iOS
```

---

## 🎨 Que faire maintenant ?

### Si vous voulez TESTER l'app :
```bash
npm start
# Puis 'w' pour ouvrir dans le navigateur
```

### Si vous voulez MODIFIER le contenu :
1. Ouvrir `data/coursesData.js` dans VS Code
2. Ajouter vos propres cours
3. Sauvegarder
4. Tester avec `npm start`

### Si vous voulez PUBLIER :
1. Suivre `QUICK_START_ASSETS.md` pour créer les assets
2. Suivre `PUBLICATION_GUIDE.md` pour publier

---

## ❓ Problèmes fréquents

### "npm start" ne fonctionne pas
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
npm start
```

### "Module not found"
```bash
npm install
```

### Port déjà utilisé
```bash
# Arrêter les processus existants
pkill -f expo
npm start
```

---

Prêt à démarrer ! 🚀
