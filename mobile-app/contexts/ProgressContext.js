import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  getProgress,
  saveProgress,
  getCompletedLessons,
  saveCompletedLesson,
  getQuizResults,
  saveQuizResult,
} from '../utils/storage';
import { coursesData } from '../data/coursesData';
import { quizData } from '../data/quizData';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    global: 0,
    bySubject: {
      math: 0,
      french: 0,
      history: 0,
      sciences: 0,
    },
  });

  const [completedLessons, setCompletedLessons] = useState({});
  const [quizResults, setQuizResults] = useState({});
  const [loading, setLoading] = useState(true);

  // Charger les données au démarrage
  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const prog = await getProgress();
      if (prog) {
        setProgress(prog);
      }

      const lessons = await getCompletedLessons();
      setCompletedLessons(lessons);

      const results = await getQuizResults();
      setQuizResults(results);
    } catch (error) {
      console.error('Erreur lors du chargement de la progression:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculer la progression pour une matière
  const calculateSubjectProgress = (subjectId) => {
    // Nombre de cours dans la matière
    const totalLessons = coursesData[subjectId]?.length || 0;
    const completedLessonsCount =
      completedLessons[subjectId]?.length || 0;

    // Nombre de quiz dans la matière
    const totalQuiz = quizData[subjectId]?.length || 0;
    const completedQuizCount = quizResults[subjectId]?.length || 0;

    if (totalLessons === 0 && totalQuiz === 0) return 0;

    // Pondération : 60% cours, 40% quiz
    const lessonsProgress =
      totalLessons > 0 ? (completedLessonsCount / totalLessons) * 60 : 0;
    const quizProgress =
      totalQuiz > 0 ? (completedQuizCount / totalQuiz) * 40 : 0;

    return Math.round(lessonsProgress + quizProgress);
  };

  // Calculer la progression globale
  const calculateGlobalProgress = () => {
    const subjects = ['math', 'french', 'history', 'sciences'];
    const total = subjects.reduce(
      (sum, subject) => sum + calculateSubjectProgress(subject),
      0
    );
    return Math.round(total / subjects.length);
  };

  // Mettre à jour la progression
  const updateProgress = async () => {
    const bySubject = {
      math: calculateSubjectProgress('math'),
      french: calculateSubjectProgress('french'),
      history: calculateSubjectProgress('history'),
      sciences: calculateSubjectProgress('sciences'),
    };

    const global = calculateGlobalProgress();

    const newProgress = {
      global,
      bySubject,
    };

    setProgress(newProgress);
    await saveProgress(newProgress);
  };

  // Marquer une leçon comme complétée
  const completeLesson = async (subjectId, lessonIndex) => {
    await saveCompletedLesson(subjectId, lessonIndex);
    const updatedLessons = await getCompletedLessons();
    setCompletedLessons(updatedLessons);
    await updateProgress();
    return true;
  };

  // Enregistrer un résultat de quiz
  const recordQuizResult = async (subjectId, quizId, score, total) => {
    await saveQuizResult(subjectId, quizId, score, total);
    const updatedResults = await getQuizResults();
    setQuizResults(updatedResults);
    await updateProgress();
    return true;
  };

  // Vérifier si une leçon est complétée
  const isLessonCompleted = (subjectId, lessonIndex) => {
    return completedLessons[subjectId]?.includes(lessonIndex) || false;
  };

  // Obtenir les statistiques détaillées pour une matière
  const getSubjectStats = (subjectId) => {
    const totalLessons = coursesData[subjectId]?.length || 0;
    const completedLessonsCount =
      completedLessons[subjectId]?.length || 0;
    const totalQuiz = quizData[subjectId]?.length || 0;
    const completedQuizCount = quizResults[subjectId]?.length || 0;

    // Calculer le score moyen des quiz
    const subjectQuizResults = quizResults[subjectId] || [];
    const avgScore =
      subjectQuizResults.length > 0
        ? Math.round(
            subjectQuizResults.reduce(
              (sum, result) => sum + result.percentage,
              0
            ) / subjectQuizResults.length
          )
        : 0;

    return {
      totalLessons,
      completedLessons: completedLessonsCount,
      totalQuiz,
      completedQuiz: completedQuizCount,
      avgQuizScore: avgScore,
      progress: progress.bySubject[subjectId] || 0,
    };
  };

  // Obtenir le nombre total de fiches lues
  const getTotalLessonsRead = () => {
    return Object.values(completedLessons).reduce(
      (total, lessons) => total + lessons.length,
      0
    );
  };

  // Obtenir le nombre total de quiz complétés
  const getTotalQuizCompleted = () => {
    return Object.values(quizResults).reduce(
      (total, results) => total + results.length,
      0
    );
  };

  const value = {
    progress,
    completedLessons,
    quizResults,
    completeLesson,
    recordQuizResult,
    isLessonCompleted,
    getSubjectStats,
    getTotalLessonsRead,
    getTotalQuizCompleted,
    loading,
    refreshProgress: updateProgress,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default ProgressContext;
