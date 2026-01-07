import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';
import { COLORS, SPACING, SUBJECTS, CARD_STYLES } from '../utils/constants';

export default function HomeScreen({ navigation }) {
  const { user, gamification } = useUser();
  const { progress } = useProgress();

  // Obtenir un message de bienvenue basé sur l'heure
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  // Calculer la progression de cette semaine (simulé pour l'instant)
  const weekProgress = '+5%';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header personnalisé */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()}, 👋
            </Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.avatarButton}>
            <Text style={styles.avatar}>{user.avatar}</Text>
          </TouchableOpacity>
        </View>

        {/* Carte Progression Globale */}
        <View style={[styles.card, styles.progressCard]}>
          <Text style={styles.progressTitle}>Prêt pour le Brevet</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressPercentage}>{progress.global}%</Text>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>{weekProgress} cette semaine</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progress.global}%` },
              ]}
            />
          </View>
          <Text style={styles.progressSubtext}>
            Continuez comme ça ! Plus que 3 leçons en Maths.
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {/* Streak */}
          <View style={[styles.statCard, styles.streakCard]}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🔥</Text>
            </View>
            <Text style={styles.statValue}>{gamification.streak}</Text>
            <Text style={styles.statLabel}>Jours d'affilée</Text>
          </View>

          {/* Objectif du jour */}
          <View style={[styles.statCard, styles.goalCard]}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🎯</Text>
            </View>
            <Text style={styles.statValue}>
              {gamification.dailyGoal.completed}/{gamification.dailyGoal.total}
            </Text>
            <Text style={styles.statLabel}>Objectif du jour</Text>
          </View>
        </View>

        {/* Quiz Rapide */}
        <TouchableOpacity
          style={styles.quickQuizCard}
          onPress={() => navigation.navigate('Subjects', { quizMode: true })}
        >
          <View style={styles.quickQuizContent}>
            <View>
              <Text style={styles.quickQuizTitle}>Quiz Rapide</Text>
              <Text style={styles.quickQuizSubtitle}>
                5 questions pour tester tes connaissances
              </Text>
            </View>
            <View style={styles.quickQuizIcon}>
              <Text style={styles.quickQuizEmoji}>⚡</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Matières */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Matières</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Subjects')}>
            <Text style={styles.seeAllText}>Tout voir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subjectsGrid}>
          {Object.values(SUBJECTS).map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectCard,
                { backgroundColor: subject.bgColor },
              ]}
              onPress={() =>
                navigation.navigate('Subjects', { selectedSubject: subject.id })
              }
            >
              <View
                style={[
                  styles.subjectIconContainer,
                  { backgroundColor: subject.color },
                ]}
              >
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
              </View>
              <Text style={styles.subjectName}>{subject.shortName}</Text>
              <View style={styles.subjectProgressContainer}>
                <View style={styles.subjectProgressBar}>
                  <View
                    style={[
                      styles.subjectProgressFill,
                      {
                        width: `${progress.bySubject[subject.id]}%`,
                        backgroundColor: subject.color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.subjectProgressText}>
                  {progress.bySubject[subject.id]}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommandation */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>⭐ Recommandé</Text>
          </View>
          <Text style={styles.recommendationTitle}>
            Prépare ton Brevet Blanc avec nos quiz !
          </Text>
          <Text style={styles.recommendationSubtitle}>
            Une sélection de sujets probables pour t'entraîner en conditions réelles.
          </Text>
          <TouchableOpacity
            style={styles.recommendationButton}
            onPress={() => navigation.navigate('Subjects', { quizMode: true })}
          >
            <Text style={styles.recommendationButtonText}>
              Commencer l'entraînement
            </Text>
          </TouchableOpacity>
        </View>

        {/* Espacement en bas */}
        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  avatarButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...CARD_STYLES.default,
  },
  avatar: {
    fontSize: 32,
  },

  // Card de base
  card: {
    ...CARD_STYLES.default,
    marginBottom: SPACING.md,
  },

  // Progression Globale
  progressCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  progressPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SPACING.md,
  },
  progressBadge: {
    backgroundColor: COLORS.blueBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    ...CARD_STYLES.default,
    padding: SPACING.md,
    alignItems: 'center',
  },
  streakCard: {
    backgroundColor: '#FFF5F0',
  },
  goalCard: {
    backgroundColor: '#F0F5FF',
  },
  statIconContainer: {
    marginBottom: SPACING.sm,
  },
  statIcon: {
    fontSize: 32,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Quiz Rapide
  quickQuizCard: {
    ...CARD_STYLES.default,
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  quickQuizContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickQuizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  quickQuizSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  quickQuizIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickQuizEmoji: {
    fontSize: 28,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Grille de Matières
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  subjectCard: {
    width: '47%',
    ...CARD_STYLES.default,
    padding: SPACING.md,
  },
  subjectIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  subjectIcon: {
    fontSize: 24,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subjectProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  subjectProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  subjectProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    width: 32,
  },

  // Recommandation
  recommendationCard: {
    ...CARD_STYLES.large,
    backgroundColor: COLORS.primary,
  },
  recommendedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  recommendedText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  recommendationButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  recommendationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
