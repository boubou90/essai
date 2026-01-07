import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  getUserProfile,
  saveUserProfile,
  getGamification,
  saveGamification,
  initializeDefaultData,
} from '../utils/storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Élève',
    avatar: '👨‍🎓',
    class: '',
    school: '',
  });

  const [gamification, setGamification] = useState({
    streak: 0,
    lastVisit: new Date().toISOString(),
    badges: 0,
    totalBadges: 12,
    dailyGoal: {
      completed: 0,
      total: 5,
    },
    unlockedBadges: [],
  });

  const [loading, setLoading] = useState(true);

  // Charger les données au démarrage
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Initialiser les données par défaut si nécessaire
      await initializeDefaultData();

      // Charger le profil
      const profile = await getUserProfile();
      if (profile) {
        setUser(profile);
      }

      // Charger la gamification
      const gamif = await getGamification();
      if (gamif) {
        // Vérifier et mettre à jour le streak
        const updatedGamif = updateStreak(gamif);
        setGamification(updatedGamif);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le streak
  const updateStreak = (gamif) => {
    const now = new Date();
    const lastVisit = new Date(gamif.lastVisit);
    const hoursDiff = (now - lastVisit) / (1000 * 60 * 60);

    let newStreak = gamif.streak;

    if (hoursDiff > 48) {
      // Plus de 2 jours : reset du streak
      newStreak = 1;
    } else if (hoursDiff > 24) {
      // Plus de 24h : incrémenter le streak
      newStreak = gamif.streak + 1;
    }
    // Moins de 24h : garder le streak actuel

    const updated = {
      ...gamif,
      streak: newStreak,
      lastVisit: now.toISOString(),
    };

    // Sauvegarder immédiatement
    saveGamification(updated);

    return updated;
  };

  // Mettre à jour le profil
  const updateProfile = async (newProfile) => {
    setUser(newProfile);
    await saveUserProfile(newProfile);
  };

  // Incrémenter l'objectif du jour
  const incrementDailyGoal = async () => {
    const newCompleted = Math.min(
      gamification.dailyGoal.completed + 1,
      gamification.dailyGoal.total
    );

    const updated = {
      ...gamification,
      dailyGoal: {
        ...gamification.dailyGoal,
        completed: newCompleted,
      },
    };

    setGamification(updated);
    await saveGamification(updated);
  };

  // Reset l'objectif du jour (à appeler chaque nouveau jour)
  const resetDailyGoal = async () => {
    const updated = {
      ...gamification,
      dailyGoal: {
        completed: 0,
        total: 5,
      },
    };

    setGamification(updated);
    await saveGamification(updated);
  };

  // Débloquer un badge
  const unlockBadge = async (badgeId) => {
    if (!gamification.unlockedBadges.includes(badgeId)) {
      const updated = {
        ...gamification,
        unlockedBadges: [...gamification.unlockedBadges, badgeId],
        badges: gamification.unlockedBadges.length + 1,
      };

      setGamification(updated);
      await saveGamification(updated);
      return true; // Nouveau badge débloqué
    }
    return false; // Badge déjà débloqué
  };

  const value = {
    user,
    updateProfile,
    gamification,
    incrementDailyGoal,
    resetDailyGoal,
    unlockBadge,
    loading,
    refreshData: loadUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
