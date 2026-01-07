import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function ShareableProgressCard({ user, gamification, progress, stats }) {
  return (
    <View style={styles.container}>
      {/* Header avec logo et titre */}
      <View style={styles.header}>
        <Text style={styles.appName}>📚 RevisionApp</Text>
        <Text style={styles.tagline}>Révise et progresse !</Text>
      </View>

      {/* Profil utilisateur */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{user.avatar}</Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        {user.class && <Text style={styles.userClass}>{user.class}</Text>}
      </View>

      {/* Progression globale */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Ma progression</Text>
        <View style={styles.progressCircleContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>{progress.global}%</Text>
            <Text style={styles.progressLabel}>complété</Text>
          </View>
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🔥</Text>
          <Text style={styles.statNumber}>{gamification.streak}</Text>
          <Text style={styles.statLabel}>jours de série</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🏆</Text>
          <Text style={styles.statNumber}>{gamification.badges}</Text>
          <Text style={styles.statLabel}>badges</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📖</Text>
          <Text style={styles.statNumber}>{stats.lessonsRead}</Text>
          <Text style={styles.statLabel}>leçons</Text>
        </View>
      </View>

      {/* Message motivant */}
      <View style={styles.motivationSection}>
        <Text style={styles.motivationText}>
          {progress.global < 30 && "🚀 Continue comme ça !"}
          {progress.global >= 30 && progress.global < 60 && "💪 Tu es sur la bonne voie !"}
          {progress.global >= 60 && progress.global < 90 && "⭐ Excellent travail !"}
          {progress.global >= 90 && "🎉 Champion de la révision !"}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>#RevisionApp #Collège #Réussite</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    width: '100%',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },

  // Profil
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatar: {
    fontSize: 48,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userClass: {
    fontSize: 16,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.blueBg,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Progression
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  progressCircleContainer: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: COLORS.primary,
  },
  progressNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  // Statistiques
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Motivation
  motivationSection: {
    backgroundColor: COLORS.blueBg,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  motivationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },

  // Footer
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});
