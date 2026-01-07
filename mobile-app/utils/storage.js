import AsyncStorage from '@react-native-async-storage/async-storage';

// Clés de stockage
const STORAGE_KEYS = {
  USER_PROFILE: '@user_profile',
  PROGRESS: '@progress',
  GAMIFICATION: '@gamification',
  COMPLETED_LESSONS: '@completed_lessons',
  QUIZ_RESULTS: '@quiz_results',
};

// Sauvegarder des données
export const saveData = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error('Erreur lors de la sauvegarde:', e);
    return false;
  }
};

// Récupérer des données
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Erreur lors de la récupération:', e);
    return null;
  }
};

// Supprimer des données
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Erreur lors de la suppression:', e);
    return false;
  }
};

// Fonctions spécifiques

// Profil utilisateur
export const saveUserProfile = async (profile) => {
  return await saveData(STORAGE_KEYS.USER_PROFILE, profile);
};

export const getUserProfile = async () => {
  return await getData(STORAGE_KEYS.USER_PROFILE);
};

// Progression
export const saveProgress = async (progress) => {
  return await saveData(STORAGE_KEYS.PROGRESS, progress);
};

export const getProgress = async () => {
  return await getData(STORAGE_KEYS.PROGRESS);
};

// Gamification
export const saveGamification = async (gamification) => {
  return await saveData(STORAGE_KEYS.GAMIFICATION, gamification);
};

export const getGamification = async () => {
  return await getData(STORAGE_KEYS.GAMIFICATION);
};

// Leçons complétées
export const saveCompletedLesson = async (subjectId, lessonId) => {
  const completed = await getData(STORAGE_KEYS.COMPLETED_LESSONS) || {};
  if (!completed[subjectId]) {
    completed[subjectId] = [];
  }
  if (!completed[subjectId].includes(lessonId)) {
    completed[subjectId].push(lessonId);
  }
  return await saveData(STORAGE_KEYS.COMPLETED_LESSONS, completed);
};

export const getCompletedLessons = async (subjectId = null) => {
  const completed = await getData(STORAGE_KEYS.COMPLETED_LESSONS) || {};
  if (subjectId) {
    return completed[subjectId] || [];
  }
  return completed;
};

// Résultats de quiz
export const saveQuizResult = async (subjectId, quizId, score, total) => {
  const results = await getData(STORAGE_KEYS.QUIZ_RESULTS) || {};
  if (!results[subjectId]) {
    results[subjectId] = [];
  }
  results[subjectId].push({
    quizId,
    score,
    total,
    percentage: Math.round((score / total) * 100),
    date: new Date().toISOString(),
  });
  return await saveData(STORAGE_KEYS.QUIZ_RESULTS, results);
};

export const getQuizResults = async (subjectId = null) => {
  const results = await getData(STORAGE_KEYS.QUIZ_RESULTS) || {};
  if (subjectId) {
    return results[subjectId] || [];
  }
  return results;
};

// Initialiser les données par défaut
export const initializeDefaultData = async () => {
  const profile = await getUserProfile();
  if (!profile) {
    await saveUserProfile({
      name: 'Élève',
      avatar: '👨‍🎓',
      class: '',
      school: '',
    });
  }

  const progress = await getProgress();
  if (!progress) {
    await saveProgress({
      global: 0,
      bySubject: {
        math: 0,
        french: 0,
        history: 0,
        sciences: 0,
      },
    });
  }

  const gamification = await getGamification();
  if (!gamification) {
    await saveGamification({
      streak: 0,
      lastVisit: new Date().toISOString(),
      badges: 0,
      totalBadges: 12,
      dailyGoal: {
        completed: 0,
        total: 5,
      },
    });
  }
};

export default {
  saveData,
  getData,
  removeData,
  saveUserProfile,
  getUserProfile,
  saveProgress,
  getProgress,
  saveGamification,
  getGamification,
  saveCompletedLesson,
  getCompletedLessons,
  saveQuizResult,
  getQuizResults,
  initializeDefaultData,
};
