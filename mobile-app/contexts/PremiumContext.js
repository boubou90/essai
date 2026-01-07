import React, { createContext, useState, useEffect, useContext } from 'react';
import { saveData, getData } from '../utils/storage';

const PremiumContext = createContext();

const STORAGE_KEY = '@premium_status';
const FREE_LESSONS_LIMIT = 2; // 2 cours gratuits par matière

export const PremiumProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Charger l'état premium au démarrage
  useEffect(() => {
    loadPremiumStatus();
  }, []);

  const loadPremiumStatus = async () => {
    try {
      const status = await getData(STORAGE_KEY);
      if (status !== null) {
        setIsPremium(status);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du statut premium:', error);
    } finally {
      setLoading(false);
    }
  };

  // Activer le premium (pour test ou après achat)
  const activatePremium = async () => {
    try {
      await saveData(STORAGE_KEY, true);
      setIsPremium(true);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'activation premium:', error);
      return false;
    }
  };

  // Désactiver le premium (pour test)
  const deactivatePremium = async () => {
    try {
      await saveData(STORAGE_KEY, false);
      setIsPremium(false);
      return true;
    } catch (error) {
      console.error('Erreur lors de la désactivation premium:', error);
      return false;
    }
  };

  // Vérifier si un cours est accessible
  const canAccessLesson = (lessonIndex) => {
    if (isPremium) return true;
    return lessonIndex < FREE_LESSONS_LIMIT;
  };

  // Vérifier si un quiz est accessible
  const canAccessQuiz = (quizIndex) => {
    if (isPremium) return true;
    // Les quiz sont accessibles uniquement en premium
    return false;
  };

  // Obtenir le nombre de cours gratuits restants pour une matière
  const getFreeLessonsRemaining = (totalLessons) => {
    if (isPremium) return totalLessons;
    return Math.max(0, FREE_LESSONS_LIMIT);
  };

  const value = {
    isPremium,
    loading,
    activatePremium,
    deactivatePremium,
    canAccessLesson,
    canAccessQuiz,
    getFreeLessonsRemaining,
    FREE_LESSONS_LIMIT,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

export default PremiumContext;
