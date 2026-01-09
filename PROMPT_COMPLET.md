# 📚 Application Mobile de Révisions Collège - Spécifications Complètes

## 🎯 Contexte et Objectif

Créer une application mobile (iOS & Android) permettant aux élèves de collège (6ème à 3ème) de réviser leurs cours et de tester leurs connaissances via des quiz. L'application doit être engageante, gamifiée et monétisée via un modèle freemium.

---

## 🛠️ Stack Technique

### Frontend
- **Framework** : React Native avec Expo (~49.0.0)
- **Navigation** : React Navigation (Native Stack Navigator)
- **State Management** : React Context API
- **Storage Local** : AsyncStorage (@react-native-async-storage/async-storage)
- **Partage** : expo-sharing + react-native-view-shot
- **Icons** : @expo/vector-icons

### Backend & Services
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth (optionnel - actuellement local)
- **Storage** : Supabase Storage (pour assets futurs)
- **Paiements** :
  - iOS : Apple In-App Purchase (StoreKit)
  - Android : Google Play Billing
- **Analytics** : Firebase Analytics (optionnel)

### Déploiement
- **iOS** : App Store via Expo EAS Build
- **Android** : Google Play Store via Expo EAS Build

---

## 📁 Architecture de l'Application

### Structure des Dossiers

```
mobile-app/
├── App.js                          # Point d'entrée, configuration navigation
├── app.json                        # Configuration Expo
├── package.json                    # Dépendances
│
├── contexts/                       # État global (Context API)
│   ├── UserContext.js             # Profil utilisateur, gamification
│   ├── ProgressContext.js         # Progression, leçons, quiz
│   └── PremiumContext.js          # Statut Premium, vérifications accès
│
├── screens/                        # Écrans de l'application
│   ├── HomeScreen.js              # Écran d'accueil principal
│   ├── SubjectsScreen.js          # Liste des matières
│   ├── CourseScreen.js            # Affichage des cours d'une matière
│   ├── QuizScreen.js              # Interface de quiz interactif
│   ├── ResultsScreen.js           # Résultats du quiz
│   ├── ProfileScreen.js           # Profil utilisateur complet
│   ├── EditProfileScreen.js       # Modification du profil
│   └── PremiumScreen.js           # Page d'upgrade Premium
│
├── components/                     # Composants réutilisables
│   └── ShareableProgressCard.js   # Carte de progression pour partage social
│
├── data/                           # Données statiques (à migrer vers Supabase)
│   ├── coursesData.js             # Contenu des cours par matière
│   └── quizData.js                # Questions de quiz par matière
│
├── utils/                          # Utilitaires
│   ├── constants.js               # Constantes (couleurs, styles, badges)
│   └── storage.js                 # Wrapper AsyncStorage
│
└── assets/                         # Images, icônes, fonts
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```

---

## 🎨 Design et Expérience Utilisateur

### Principes de Design

**Style Général** :
- Design moderne et épuré
- Interface colorée et engageante pour les adolescents
- Utilisation de nuances et dégradés subtils
- Animations fluides (transitions, micro-interactions)
- Feedback visuel instantané (boutons, validations)
- Éléments arrondis (border-radius généreux)
- Ombres légères pour la profondeur

**Palette de Couleurs** :
- Primaire : Bleu Royal (#4169E1)
- Mathématiques : Bleu (#4169E1)
- Français : Rouge (#E63946)
- Histoire-Géographie : Vert (#06D6A0)
- Sciences : Violet (#7209B7)
- Premium/Or : #FFD700
- Série/Feu : Orange (#FF6B35)
- Badges : Jaune doré (#FFD60A)

**Animations** :
- Transitions de pages fluides
- Animations au chargement (skeleton screens)
- Feedback tactile (vibrations légères)
- Progression animée (barres, cercles)
- Effets de confettis lors de succès
- Bounce effects sur les boutons

**Typographie** :
- Titres : Bold, 24-32px
- Corps : Regular, 14-16px
- Labels : Medium, 12-14px
- Emojis utilisés pour renforcer les messages

---

## ⚙️ Fonctionnalités Détaillées

### 1. Système d'Authentification (Futur avec Supabase)

**Actuellement** : Pas d'authentification, profil local avec AsyncStorage

**À Implémenter** :
- Inscription/Connexion via email + mot de passe
- Connexion sociale (Google, Apple)
- Gestion des sessions avec Supabase Auth
- Récupération de mot de passe
- Synchronisation multi-appareils

**Base Supabase - Table `users`** :
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  class TEXT,
  school TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Contenu Pédagogique

**4 Matières** :
- 🧮 Mathématiques
- 📖 Français
- 🌍 Histoire-Géographie
- 🧪 Sciences (SVT + Physique-Chimie)

**Structure des Cours** :
- Titre de la leçon
- Contenu textuel (markdown supporté)
- Points clés (bullet points)
- Exemples pratiques
- Niveau de difficulté (à ajouter)

**Base Supabase - Table `courses`** :
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL, -- 'math', 'french', 'history', 'sciences'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  key_points TEXT[], -- Array de points clés
  examples TEXT[], -- Array d'exemples
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  grade_level TEXT, -- '6eme', '5eme', '4eme', '3eme'
  order_index INTEGER,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Quiz** :
- Questions à choix multiples (4 options)
- Réponse correcte identifiée
- Explication de la réponse (optionnel)
- Difficulté par question

**Base Supabase - Table `quiz_questions`** :
```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL, -- Array de 4 options
  correct_answer INTEGER NOT NULL, -- Index 0-3
  explanation TEXT,
  difficulty TEXT,
  grade_level TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Système de Profil

**Données Utilisateur** :
- Nom personnalisable
- Avatar (15 choix d'emojis : 👨‍🎓👩‍🎓🧑‍💻👨‍🔬👩‍🏫👨‍🏫👩‍💼👨‍💼🧑‍🎨👨‍🎨👩‍🔧👨‍🔧🧑‍⚕️👨‍⚕️👩‍⚕️)
- Classe (6ème, 5ème, 4ème, 3ème)
- Établissement (optionnel)

**Modification** :
- Écran dédié avec sélecteur d'avatar visuel
- Sauvegarde automatique
- Synchronisation avec Supabase (futur)

### 4. Système de Progression

**Suivi Global** :
- Pourcentage de progression global (0-100%)
- Progression par matière (calcul pondéré)
- Nombre de leçons complétées
- Nombre de quiz réussis

**Calcul de Progression** :
```javascript
// Formule par matière
progression = (leçons_complétées / total_leçons) * 60%
            + (quiz_réussis / total_quiz) * 40%
```

**Base Supabase - Table `user_progress`** :
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  completed_lessons INTEGER[] DEFAULT '{}', -- Array d'index de leçons
  quiz_results JSONB DEFAULT '[]', -- [{quiz_id, score, total, date}]
  global_progress INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, subject)
);
```

### 5. Gamification

**Série de Jours (Streak)** 🔥 :
- Compte les jours consécutifs d'utilisation
- Réinitialisation automatique si > 24h d'inactivité
- Badge spécial à 7, 30, 100 jours
- Notification de rappel si risque de perte

**Objectif Quotidien** 🎯 :
- 5 actions par jour (leçons + quiz)
- Barre de progression visuelle
- Réinitialisation à minuit

**Badges** 🏆 :
```javascript
// 12 badges prédéfinis
BADGES = [
  { id: 'first_lesson', name: 'Première Leçon', icon: '📚', condition: '1 leçon' },
  { id: 'lesson_master', name: 'Expert', icon: '🎓', condition: '10 leçons' },
  { id: 'quiz_beginner', name: 'Débutant Quiz', icon: '✏️', condition: '1 quiz' },
  { id: 'quiz_pro', name: 'Pro Quiz', icon: '🏅', condition: '10 quiz' },
  { id: 'perfect_score', name: 'Score Parfait', icon: '⭐', condition: '100% au quiz' },
  { id: 'week_streak', name: 'Série 7j', icon: '🔥', condition: '7 jours consécutifs' },
  { id: 'month_streak', name: 'Série 30j', icon: '🔥🔥', condition: '30 jours' },
  { id: 'multi_subject', name: 'Polyvalent', icon: '🌈', condition: '4 matières' },
  { id: 'early_bird', name: 'Lève-tôt', icon: '🌅', condition: 'Connexion avant 8h' },
  { id: 'night_owl', name: 'Noctambule', icon: '🦉', condition: 'Connexion après 22h' },
  { id: 'premium', name: 'Premium', icon: '👑', condition: 'Membre Premium' },
  { id: 'social', name: 'Influenceur', icon: '📱', condition: 'Partage sur réseaux' }
]
```

**Base Supabase - Table `user_gamification`** :
```sql
CREATE TABLE user_gamification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  daily_goal_completed INTEGER DEFAULT 0,
  daily_goal_total INTEGER DEFAULT 5,
  unlocked_badges TEXT[] DEFAULT '{}',
  total_lessons_read INTEGER DEFAULT 0,
  total_quiz_completed INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 6. Système Freemium

**Version Gratuite** 🆓 :
- 2 premiers cours par matière (8 cours au total)
- Pas d'accès aux quiz
- Publicités (AdMob - à implémenter)
- Statistiques basiques

**Version Premium** 👑 (1,99€ - Achat Unique) :
- Accès illimité à tous les cours (21+)
- Tous les quiz débloqués
- Pas de publicités
- Statistiques avancées
- Badges exclusifs
- Cours hors-ligne (téléchargement - futur)
- Support prioritaire

**Vérification d'Accès** :
```javascript
// Contexte Premium
canAccessLesson(lessonIndex) {
  if (isPremium) return true;
  return lessonIndex < 2; // 2 cours gratuits
}

canAccessQuiz() {
  return isPremium; // Quiz 100% premium
}
```

**Base Supabase - Table `user_premium`** :
```sql
CREATE TABLE user_premium (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  is_premium BOOLEAN DEFAULT false,
  purchase_date TIMESTAMP,
  purchase_platform TEXT, -- 'ios' ou 'android'
  purchase_receipt TEXT, -- Pour vérification
  expires_at TIMESTAMP, -- NULL pour achat unique
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Système de Paiement** :

*iOS (Apple In-App Purchase)* :
- Product ID : `com.college.revisions.premium`
- Type : Non-Consumable (achat unique)
- Prix : 1,99€
- Validation des reçus avec Supabase Edge Functions

*Android (Google Play Billing)* :
- Product ID : `premium_unlock`
- Type : In-app product (one-time)
- Prix : 1,99€
- Validation avec Google Play Developer API

**Supabase Edge Function - Validation Achat** :
```typescript
// supabase/functions/verify-purchase/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { platform, receipt, userId } = await req.json()

  // Vérifier le reçu auprès d'Apple/Google
  const isValid = await verifyReceipt(platform, receipt)

  if (isValid) {
    // Mettre à jour le statut Premium
    await supabase
      .from('user_premium')
      .upsert({
        user_id: userId,
        is_premium: true,
        purchase_date: new Date(),
        purchase_platform: platform,
        purchase_receipt: receipt
      })

    return new Response(JSON.stringify({ success: true }))
  }

  return new Response(JSON.stringify({ success: false }), { status: 400 })
})
```

### 7. Partage Social

**Fonctionnalité** :
- Génération d'une image de progression
- Partage vers Instagram, Snapchat, TikTok, WhatsApp, etc.
- Format optimisé pour stories (1080x1920)

**Contenu de l'Image** :
- Logo de l'app
- Avatar et nom de l'élève
- Progression globale (cercle)
- Statistiques (série, badges, leçons)
- Message motivant
- Hashtags (#RevisionApp #Collège #Réussite)

**Implémentation** :
- react-native-view-shot : Capture du composant
- expo-sharing : Partage natif
- Composant invisible capturé : ShareableProgressCard

**Tracking** (Firebase Analytics) :
```javascript
logEvent('share_progress', {
  platform: 'instagram', // ou autre
  progression: 65,
  user_id: userId
})
```

### 8. Notifications Push (Futur)

**Types de Notifications** :
- Rappel quotidien (heure personnalisable)
- Risque de perte de série
- Nouveau contenu disponible
- Badge débloqué
- Encouragements personnalisés

**Service** : Firebase Cloud Messaging (FCM)

**Base Supabase - Table `push_tokens`** :
```sql
CREATE TABLE push_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, token)
);
```

---

## 🗄️ Schéma Complet de la Base de Données Supabase

```sql
-- ============================================
-- TABLES PRINCIPALES
-- ============================================

-- Utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT DEFAULT 'Élève',
  avatar TEXT DEFAULT '👨‍🎓',
  class TEXT, -- '6eme', '5eme', '4eme', '3eme'
  school TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Cours
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  key_points TEXT[],
  examples TEXT[],
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  grade_level TEXT,
  order_index INTEGER,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Questions de Quiz
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer INTEGER NOT NULL CHECK (correct_answer BETWEEN 0 AND 3),
  explanation TEXT,
  difficulty TEXT,
  grade_level TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progression Utilisateur
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  completed_lessons INTEGER[] DEFAULT '{}',
  quiz_results JSONB DEFAULT '[]',
  global_progress INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

-- Gamification
CREATE TABLE user_gamification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  daily_goal_completed INTEGER DEFAULT 0,
  daily_goal_total INTEGER DEFAULT 5,
  unlocked_badges TEXT[] DEFAULT '{}',
  total_lessons_read INTEGER DEFAULT 0,
  total_quiz_completed INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Statut Premium
CREATE TABLE user_premium (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  is_premium BOOLEAN DEFAULT false,
  purchase_date TIMESTAMP,
  purchase_platform TEXT CHECK (purchase_platform IN ('ios', 'android')),
  purchase_receipt TEXT,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tokens Push Notifications
CREATE TABLE push_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, token)
);

-- Analytics / Événements
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES POUR PERFORMANCE
-- ============================================

CREATE INDEX idx_courses_subject ON courses(subject);
CREATE INDEX idx_courses_premium ON courses(is_premium);
CREATE INDEX idx_quiz_subject ON quiz_questions(subject);
CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_gamification_user ON user_gamification(user_id);
CREATE INDEX idx_premium_user ON user_premium(user_id);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_date ON analytics_events(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_premium ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

-- Politiques : Les utilisateurs ne peuvent voir que leurs propres données
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own gamification" ON user_gamification
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own premium status" ON user_premium
  FOR SELECT USING (auth.uid() = user_id);

-- Les cours et quiz sont publics (lecture seule)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Courses are publicly readable" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Quiz are publicly readable" ON quiz_questions
  FOR SELECT USING (true);

-- ============================================
-- TRIGGERS POUR AUTO-UPDATE
-- ============================================

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gamification_updated_at BEFORE UPDATE ON user_gamification
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔄 Flux de Données

### 1. Première Utilisation (Onboarding)

```
Lancement App
  ↓
Vérifier Auth Supabase
  ↓
[Non connecté] → Écran Welcome → Inscription/Connexion
  ↓
Créer profil utilisateur
  ↓
Initialiser données (gamification, progress)
  ↓
Charger contenu (cours, quiz) depuis Supabase
  ↓
Afficher HomeScreen
```

### 2. Utilisation Quotidienne

```
Lancement App
  ↓
Vérifier Auth
  ↓
[Connecté] → Charger profil + progression
  ↓
Vérifier série (24h?)
  ↓
[Série intacte] → Maintenir
[Série cassée] → Réinitialiser à 0
  ↓
Afficher HomeScreen avec données à jour
```

### 3. Complétion d'une Leçon

```
Ouvrir Cours
  ↓
Afficher contenu
  ↓
Utilisateur lit et clique "J'ai compris"
  ↓
Enregistrer dans user_progress (Supabase)
  ↓
Incrémenter daily_goal (+1)
  ↓
Recalculer progression (subject + global)
  ↓
Vérifier badges (conditions remplies?)
  ↓
[Badge débloqué] → Animation + Notification
  ↓
Mettre à jour UI (temps réel)
```

### 4. Réalisation d'un Quiz

```
Cliquer "Quiz" depuis CourseScreen
  ↓
[Version Gratuite] → Alert "Premium Required"
[Version Premium] → Charger quiz depuis Supabase
  ↓
Afficher questions une par une
  ↓
Utilisateur répond
  ↓
Calculer score final
  ↓
Enregistrer résultats dans user_progress
  ↓
Incrémenter daily_goal (+1)
  ↓
Vérifier badges (score parfait?)
  ↓
Afficher ResultsScreen avec stats
```

### 5. Achat Premium

```
Cliquer "Passer à Premium"
  ↓
Afficher PremiumScreen (tarif, avantages)
  ↓
Utilisateur clique "Acheter"
  ↓
[iOS] → Appeler StoreKit
[Android] → Appeler Google Play Billing
  ↓
Traiter paiement (1,99€)
  ↓
[Succès] → Recevoir reçu de transaction
  ↓
Envoyer reçu à Supabase Edge Function
  ↓
Vérifier reçu auprès d'Apple/Google
  ↓
[Valide] → Mettre à jour user_premium (is_premium = true)
  ↓
Envoyer confirmation à l'app
  ↓
Débloquer contenu Premium instantanément
  ↓
Afficher message de félicitations
```

### 6. Partage Social

```
Cliquer "Partager" depuis ProfileScreen
  ↓
Capturer ShareableProgressCard (view-shot)
  ↓
Générer image PNG
  ↓
Ouvrir menu de partage natif
  ↓
Utilisateur choisit plateforme (Instagram, etc.)
  ↓
Partager image
  ↓
Logger événement dans analytics
  ↓
[Premier partage] → Débloquer badge "Influenceur"
```

---

## 🚀 Fonctionnalités Futures (Roadmap)

### Phase 1 : MVP (Actuel)
- ✅ 4 matières, 21 cours, 48 quiz
- ✅ Profil personnalisable
- ✅ Gamification (streaks, badges, objectifs)
- ✅ Système freemium
- ✅ Partage social

### Phase 2 : Backend Supabase
- [ ] Migration vers Supabase (cours, quiz, profils)
- [ ] Authentification utilisateurs
- [ ] Synchronisation multi-appareils
- [ ] Système de paiement In-App (iOS + Android)

### Phase 3 : Contenu Enrichi
- [ ] 50+ cours par matière
- [ ] 200+ questions de quiz
- [ ] Fiches de révision téléchargeables (PDF)
- [ ] Vidéos explicatives (YouTube API)
- [ ] Exercices pratiques interactifs

### Phase 4 : Fonctionnalités Avancées
- [ ] Mode hors-ligne complet
- [ ] Notifications push intelligentes
- [ ] Révision espacée (algorithme Leitner)
- [ ] Parcours personnalisés (IA)
- [ ] Classements / Leaderboards
- [ ] Challenges entre amis

### Phase 5 : Monétisation Avancée
- [ ] Abonnement mensuel (alternative à l'achat unique)
- [ ] Packs de contenu premium par matière
- [ ] Coaching personnalisé (abonnement premium+)
- [ ] Mode "Parents" avec suivi des enfants

### Phase 6 : Écosystème
- [ ] Version Web (React)
- [ ] Espace enseignants (création de contenu)
- [ ] API publique pour écoles
- [ ] Intégrations LMS (Moodle, etc.)

---

## 📊 Métriques et Analytics

### Événements à Tracker

**Onboarding** :
- `app_first_open`
- `sign_up_completed`
- `profile_created`

**Engagement** :
- `lesson_started`
- `lesson_completed`
- `quiz_started`
- `quiz_completed`
- `daily_goal_reached`
- `streak_milestone` (7j, 30j, 100j)

**Monétisation** :
- `premium_screen_viewed`
- `purchase_initiated`
- `purchase_completed`
- `purchase_failed`

**Social** :
- `share_progress_clicked`
- `share_completed`

**Rétention** :
- `session_start`
- `session_duration`
- `days_since_install`
- `days_active_last_7`

### KPIs Principaux

- **DAU/MAU** (Daily/Monthly Active Users)
- **Taux de rétention** (J1, J7, J30)
- **Taux de conversion freemium → premium**
- **ARPU** (Average Revenue Per User)
- **LTV** (Lifetime Value)
- **Temps moyen par session**
- **Nombre de leçons par utilisateur**
- **Taux de complétion des quiz**

---

## 🔐 Sécurité et Conformité

### RGPD (Données Personnelles)
- Consentement explicite lors de l'inscription
- Droit à l'effacement (suppression compte)
- Export des données utilisateur
- Politique de confidentialité claire
- Cookies : seulement essentiels

### Sécurité des Données
- Chiffrement HTTPS (Supabase)
- Authentification JWT (Supabase Auth)
- Row Level Security (RLS) activée
- Validation côté serveur (Edge Functions)
- Pas de données sensibles en local

### App Store Compliance
- Privacy Nutrition Label (iOS)
- Données collectées déclarées
- Âge minimum : 4+ (avec consentement parental)
- Pas de publicité ciblée pour mineurs

---

## 📱 Configuration Expo

### app.json
```json
{
  "expo": {
    "name": "Collège Révisions",
    "slug": "college-revisions",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4169E1"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.college.revisions",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSCameraUsageDescription": "Pour prendre une photo de profil",
        "NSPhotoLibraryUsageDescription": "Pour choisir une photo de profil"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4169E1"
      },
      "package": "com.college.revisions",
      "versionCode": 1,
      "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE"]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font",
      "@react-native-async-storage/async-storage"
    ],
    "extra": {
      "supabaseUrl": "SUPABASE_URL_HERE",
      "supabaseAnonKey": "SUPABASE_ANON_KEY_HERE"
    }
  }
}
```

---

## 🧪 Tests

### Tests Unitaires (Jest)
- Logique métier (calculs de progression)
- Contextes (UserContext, ProgressContext, PremiumContext)
- Utilitaires (storage, constants)

### Tests d'Intégration
- Navigation complète
- Flux freemium → premium
- Sauvegarde et récupération données
- Synchronisation Supabase

### Tests E2E (Detox)
- Parcours complet utilisateur
- Achat premium
- Partage social

---

## 📦 Déploiement

### Build avec EAS
```bash
# Configuration
eas build:configure

# Build iOS
eas build --platform ios --profile production

# Build Android
eas build --platform android --profile production

# Submit iOS
eas submit --platform ios

# Submit Android
eas submit --platform android
```

### CI/CD (GitHub Actions)
- Build automatique sur merge main
- Tests automatisés
- Déploiement sur TestFlight/Internal Testing
- Release automatique vers stores

---

## 📄 Licence et Crédits

**Développé par** : [Ton Nom/École]
**Framework** : React Native + Expo
**Backend** : Supabase
**Icons** : Expo Vector Icons
**Illustrations** : À définir

---

## 🆘 Support et Documentation

**Documentation développeur** : `/docs`
**Guide utilisateur** : Dans l'app (écran Help)
**Support technique** : support@college-revisions.fr
**Politique de confidentialité** : `/PRIVACY_POLICY.md`
**Conditions d'utilisation** : `/TERMS.md`

---

**Note** : Ce prompt définit l'architecture complète. Le design UI détaillé sera créé de manière moderne, colorée et engageante, avec animations fluides, sans spécifications pixel-perfect préalables.
