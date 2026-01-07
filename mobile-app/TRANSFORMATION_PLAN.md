# 🎯 Plan de Transformation - Version Moderne

## 📋 Objectif
Transformer l'application actuelle pour qu'elle ressemble aux screenshots fournis avec :
- Profil utilisateur personnalisable
- Système de progression
- Gamification (badges, streaks, objectifs)
- Design moderne et coloré
- Fonctionnalités avancées

---

## 🗓️ Plan d'implémentation (7 phases)

### Phase 1 : Stockage et Context API ⚙️
**Durée** : 1-2 heures

**À créer** :
- `contexts/UserContext.js` - Gestion du profil utilisateur
- `contexts/ProgressContext.js` - Gestion de la progression
- `utils/storage.js` - Sauvegarde locale (AsyncStorage)

**Données à stocker** :
```javascript
{
  user: {
    name: "Léa Martin",
    avatar: "url",
    class: "3ème B",
    school: "Collège Victor Hugo"
  },
  progress: {
    global: 42,
    bySubject: { math: 65, french: 40, history: 50, sciences: 30 },
    byChapter: { ... }
  },
  gamification: {
    streak: 5,
    badges: 12,
    dailyGoal: { completed: 3, total: 5 }
  }
}
```

---

### Phase 2 : Profil Utilisateur 👤
**Durée** : 2-3 heures

**Écrans à créer** :
1. `screens/ProfileScreen.js` - Affichage du profil
2. `screens/EditProfileScreen.js` - Modification du profil

**Fonctionnalités** :
- Avatar personnalisable (emoji ou image)
- Nom, classe, établissement
- Affichage progression globale
- Stats : jours d'affilée, badges

**Components** :
- `components/AvatarPicker.js`
- `components/ProgressCard.js`
- `components/StatsCard.js`

---

### Phase 3 : Système de Progression 📊
**Durée** : 3-4 heures

**Modifications** :
1. Tracker les fiches lues
2. Tracker les quiz complétés
3. Calculer progression par matière
4. Calculer progression globale
5. Calculer progression par chapitre

**Logique** :
```javascript
// Progression = (fiches lues + quiz réussis) / total
math: {
  fichesLues: 12,
  totalFiches: 20,
  quizCompletes: 8,
  totalQuiz: 12,
  progression: 65% // calculée
}
```

**Affichage** :
- Barre de progression partout
- Pourcentage
- "12/20 fiches maîtrisées"

---

### Phase 4 : Gamification 🎮
**Durée** : 2-3 heures

**1. Système de Streaks (jours d'affilée)**
- Tracker la dernière visite
- Incrémenter si visite quotidienne
- Reset si > 24h
- Affichage avec icône 🔥

**2. Système de Badges**
```javascript
badges: [
  { id: 1, name: "Première leçon", icon: "🎓", unlocked: true },
  { id: 2, name: "Quiz Master", icon: "⚡", unlocked: true },
  { id: 3, name: "Série de 5", icon: "🔥", unlocked: true },
  // ... 12 badges au total
]
```

**3. Objectif du jour**
- 5 cartes/quiz par jour
- Progression 3/5
- Notification encouragement

**Components** :
- `components/StreakBadge.js`
- `components/BadgesList.js`
- `components/DailyGoal.js`

---

### Phase 5 : Écran d'Accueil Moderne 🏠
**Durée** : 3-4 heures

**Nouveau HomeScreen** avec sections :

1. **Header personnalisé**
   - "Bon retour, Thomas 👋"
   - Avatar + icône paramètres

2. **Carte Progression Globale**
   - "Prêt pour le Brevet"
   - 42% avec barre
   - "+5% cette semaine"

3. **Quick Actions**
   - Série actuelle : 5 jours 🔥
   - Objectif : 3/5 cartes
   - Quiz rapide (recommandé)

4. **Matières** (4 cartes)
   - Math, Français, Histoire-Géo, Sciences
   - Avec icônes colorées
   - Bouton "Tout voir"

5. **Recommandation**
   - "Prépare ton Brevet Blanc avec nos quiz !"
   - Carte bleue avec suggestion

**Design** :
- Fond blanc/gris clair
- Cartes arrondies avec ombres
- Icônes colorées par matière
- Espacements généreux

---

### Phase 6 : Écran Matières Amélioré 📚
**Durée** : 2-3 heures

**Modifications de SubjectsScreen** :

1. **Header avec recherche**
   - Barre de recherche
   - "Rechercher une fiche, un sujet..."

2. **Progression du chapitre**
   - Carte blanche en haut
   - "Progression du chapitre : 60%"
   - "12/20 fiches maîtrisées"

3. **Filtres par catégorie**
   - Boutons : Tout, Algèbre, Géométrie, Fonctions
   - Style pill/rounded

4. **Sections organisées**
   - "À FAIRE" (fiches non lues)
   - "EN COURS" (fiches commencées)
   - Icônes différentes par type
   - Durée estimée (5 min, 10 min)
   - Icône bookmark pour favoris

**Components** :
- `components/SearchBar.js`
- `components/FilterButtons.js`
- `components/ChapterProgress.js`
- `components/LessonCard.js`

---

### Phase 7 : Design Moderne 🎨
**Durée** : 2-3 heures

**Nouvelle palette de couleurs** :
```javascript
colors: {
  primary: '#4169E1',        // Bleu royal
  background: '#F8F9FA',     // Gris très clair
  white: '#FFFFFF',

  // Matières
  math: '#4169E1',           // Bleu
  french: '#E63946',         // Rouge
  history: '#06D6A0',        // Vert/turquoise
  sciences: '#7209B7',       // Violet

  // Progression
  progressBlue: '#4169E1',
  progressRed: '#E63946',

  // Texte
  textPrimary: '#1A1A1A',
  textSecondary: '#6C757D',

  // Accents
  streak: '#FF6B35',         // Orange pour le feu
  badge: '#FFD60A',          // Jaune doré
}
```

**Composants design** :
- Cartes avec `borderRadius: 16`
- Ombres douces : `elevation: 2`
- Icônes Material ou Ionicons
- Polices : System (iOS) / Roboto (Android)
- Espacements : 16, 24, 32 px

**Icons mapping** :
```javascript
Math: ➕ ou icône calculator
Français: 📖 ou icône book
Histoire-Géo: 🌍 ou icône globe
Sciences: 🧪 ou icône flask
```

---

### Phase 8 : Matière Sciences 🧪
**Durée** : 1-2 heures

**Ajouter** :
- Données cours Sciences dans `data/coursesData.js`
- Données quiz Sciences dans `data/quizData.js`
- Icône violette pour Sciences
- 5 cours + 12 questions minimum

**Contenus Sciences** :
- Le corps humain
- Les états de la matière
- L'énergie
- L'électricité
- Le système solaire

---

## 📦 Nouvelles dépendances

```bash
npm install @react-native-async-storage/async-storage
npm install @expo/vector-icons
npm install react-native-emoji-selector
```

---

## 🎯 Ordre d'implémentation recommandé

### Jour 1 (4-5h)
- ✅ Phase 1 : Context et Storage
- ✅ Phase 2 : Profil utilisateur
- ✅ Début Phase 3 : Progression basique

### Jour 2 (4-5h)
- ✅ Fin Phase 3 : Progression complète
- ✅ Phase 4 : Gamification
- ✅ Phase 8 : Ajouter Sciences

### Jour 3 (4-5h)
- ✅ Phase 5 : Nouvel écran d'accueil
- ✅ Phase 6 : Écrans matières améliorés
- ✅ Phase 7 : Design moderne
- ✅ Tests et ajustements

**Total** : ~15 heures de développement

---

## ✅ Checklist de fonctionnalités

### Must-have (Version 1) :
- [ ] Profil utilisateur modifiable
- [ ] Progression par matière
- [ ] Progression globale
- [ ] Streak (jours d'affilée)
- [ ] Écran d'accueil moderne
- [ ] 4 matières (+ Sciences)
- [ ] Design coloré et moderne

### Nice-to-have (Version 2) :
- [ ] Système de badges complet (12 badges)
- [ ] Objectif du jour
- [ ] Recherche avancée
- [ ] Filtres par catégorie
- [ ] Favoris/Bookmarks
- [ ] Statistiques détaillées
- [ ] Graphiques de progression

---

## 🚀 Prêt à commencer ?

**Prochaine étape** :
Commencer par la Phase 1 - Créer les Contexts et le système de stockage.

Voulez-vous que je commence maintenant ? 🎯
