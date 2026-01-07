// 🎨 Palette de couleurs moderne
export const COLORS = {
  // Couleurs principales
  primary: '#4169E1',
  background: '#F8F9FA',
  white: '#FFFFFF',

  // Matières
  math: '#4169E1',         // Bleu
  french: '#E63946',       // Rouge
  history: '#06D6A0',      // Vert/turquoise
  sciences: '#7209B7',     // Violet

  // Progression
  progressBlue: '#4169E1',
  progressRed: '#E63946',
  progressGreen: '#06D6A0',

  // Texte
  textPrimary: '#1A1A1A',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',

  // Accents et gamification
  streak: '#FF6B35',       // Orange pour le feu
  badge: '#FFD60A',        // Jaune doré
  success: '#06D6A0',
  warning: '#FFB703',
  error: '#E63946',

  // Backgrounds
  cardBg: '#FFFFFF',
  lightBg: '#F8F9FA',
  blueBg: '#E7F0FF',
  redBg: '#FFEAED',
  greenBg: '#D7F5EE',
  purpleBg: '#F0E7FF',

  // Bordures
  border: '#E9ECEF',
  borderLight: '#F1F3F5',
};

// 📐 Espacements
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 🔤 Typographie
export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    color: COLORS.textPrimary,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: 'normal',
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.textLight,
  },
};

// 🃏 Styles de cartes
export const CARD_STYLES = {
  default: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  large: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
};

// 📚 Données des matières
export const SUBJECTS = {
  math: {
    id: 'math',
    name: 'Mathématiques',
    shortName: 'Maths',
    icon: '➕',
    color: COLORS.math,
    bgColor: COLORS.blueBg,
  },
  french: {
    id: 'french',
    name: 'Français',
    shortName: 'Français',
    icon: '📖',
    color: COLORS.french,
    bgColor: COLORS.redBg,
  },
  history: {
    id: 'history',
    name: 'Histoire-Géographie',
    shortName: 'Histoire-Géo',
    icon: '🌍',
    color: COLORS.history,
    bgColor: COLORS.greenBg,
  },
  sciences: {
    id: 'sciences',
    name: 'Sciences',
    shortName: 'Sciences',
    icon: '🧪',
    color: COLORS.sciences,
    bgColor: COLORS.purpleBg,
  },
};

// 🏆 Badges disponibles
export const BADGES = [
  {
    id: 1,
    name: 'Première leçon',
    description: 'Terminer ta première leçon',
    icon: '🎓',
    condition: 'lessons',
    threshold: 1,
  },
  {
    id: 2,
    name: 'Quiz Master',
    description: 'Réussir 5 quiz',
    icon: '⚡',
    condition: 'quiz',
    threshold: 5,
  },
  {
    id: 3,
    name: 'Série de 5',
    description: '5 jours d\'affilée',
    icon: '🔥',
    condition: 'streak',
    threshold: 5,
  },
  {
    id: 4,
    name: 'Mathématicien',
    description: 'Terminer 10 leçons de maths',
    icon: '🧮',
    condition: 'math_lessons',
    threshold: 10,
  },
  {
    id: 5,
    name: 'Littéraire',
    description: 'Terminer 10 leçons de français',
    icon: '📚',
    condition: 'french_lessons',
    threshold: 10,
  },
  {
    id: 6,
    name: 'Historien',
    description: 'Terminer 10 leçons d\'histoire',
    icon: '🏛️',
    condition: 'history_lessons',
    threshold: 10,
  },
  {
    id: 7,
    name: 'Scientifique',
    description: 'Terminer 10 leçons de sciences',
    icon: '🔬',
    condition: 'sciences_lessons',
    threshold: 10,
  },
  {
    id: 8,
    name: 'Perfectionniste',
    description: 'Obtenir 100% à un quiz',
    icon: '💯',
    condition: 'perfect_quiz',
    threshold: 1,
  },
  {
    id: 9,
    name: 'Assidu',
    description: '10 jours d\'affilée',
    icon: '⭐',
    condition: 'streak',
    threshold: 10,
  },
  {
    id: 10,
    name: 'Champion',
    description: '20 jours d\'affilée',
    icon: '🏆',
    condition: 'streak',
    threshold: 20,
  },
  {
    id: 11,
    name: 'Explorateur',
    description: 'Tester les 4 matières',
    icon: '🗺️',
    condition: 'all_subjects',
    threshold: 4,
  },
  {
    id: 12,
    name: 'Prêt pour le Brevet',
    description: 'Atteindre 80% de progression',
    icon: '🎯',
    condition: 'global_progress',
    threshold: 80,
  },
];

// 🎯 Avatars par défaut
export const DEFAULT_AVATARS = [
  '👨‍🎓', '👩‍🎓', '🧑‍🎓',
  '👦', '👧', '🧒',
  '😊', '😎', '🤓',
  '🦁', '🐯', '🐼',
  '🚀', '⭐', '🌟',
];

export default {
  COLORS,
  SPACING,
  TYPOGRAPHY,
  CARD_STYLES,
  SUBJECTS,
  BADGES,
  DEFAULT_AVATARS,
};
