import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useUser } from '../contexts/UserContext';
import { useProgress } from '../contexts/ProgressContext';
import { usePremium } from '../contexts/PremiumContext';
import { COLORS, SPACING, CARD_STYLES, BADGES } from '../utils/constants';
import ShareableProgressCard from '../components/ShareableProgressCard';

export default function ProfileScreen({ navigation }) {
  const { user, gamification } = useUser();
  const { progress, getTotalLessonsRead, getTotalQuizCompleted } = useProgress();
  const { isPremium } = usePremium();

  const shareCardRef = useRef();
  const [isSharing, setIsSharing] = useState(false);

  // Badges débloqués
  const unlockedBadges = gamification.unlockedBadges || [];
  const unlockedBadgesDetails = BADGES.filter(badge =>
    unlockedBadges.includes(badge.id)
  );

  // Fonction de partage
  const handleShare = async () => {
    try {
      setIsSharing(true);

      // Vérifier si le partage est disponible
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          'Partage non disponible',
          'Le partage n\'est pas disponible sur cet appareil.'
        );
        setIsSharing(false);
        return;
      }

      // Capturer la carte de progression
      const uri = await captureRef(shareCardRef, {
        format: 'png',
        quality: 1,
      });

      // Partager l'image
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Partage ma progression !',
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      Alert.alert(
        'Erreur',
        'Impossible de partager ta progression. Réessaye plus tard.'
      );
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec avatar */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarLarge}>{user.avatar}</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          {user.class && (
            <Text style={styles.userInfo}>
              {user.class}
              {user.school ? ` • ${user.school}` : ''}
            </Text>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.editButtonText}>Modifier le profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              disabled={isSharing}
            >
              {isSharing ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <>
                  <Text style={styles.shareButtonIcon}>📤</Text>
                  <Text style={styles.shareButtonText}>Partager</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Premium */}
        {!isPremium ? (
          <TouchableOpacity
            style={styles.premiumBanner}
            onPress={() => navigation.navigate('Premium')}
          >
            <View style={styles.premiumBannerContent}>
              <Text style={styles.premiumBannerIcon}>👑</Text>
              <View style={styles.premiumBannerText}>
                <Text style={styles.premiumBannerTitle}>Passe à Premium</Text>
                <Text style={styles.premiumBannerSubtitle}>
                  Tous les cours et quiz débloqués
                </Text>
              </View>
              <Text style={styles.premiumBannerArrow}>→</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.premiumActiveBanner}>
            <Text style={styles.premiumActiveIcon}>👑</Text>
            <Text style={styles.premiumActiveText}>Membre Premium</Text>
          </View>
        )}

        {/* Progression globale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ma Progression</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Prêt pour le Brevet</Text>
              <Text style={styles.progressPercentage}>{progress.global}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress.global}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Statistiques */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes Statistiques</Text>

          <View style={styles.statsGrid}>
            {/* Jours d'affilée */}
            <View style={[styles.statCard, styles.streakStatCard]}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{gamification.streak}</Text>
              <Text style={styles.statLabel}>Jours d'affilée</Text>
            </View>

            {/* Badges */}
            <View style={[styles.statCard, styles.badgesStatCard]}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statValue}>
                {gamification.badges}/{gamification.totalBadges}
              </Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>

            {/* Leçons lues */}
            <View style={[styles.statCard, styles.lessonsStatCard]}>
              <Text style={styles.statIcon}>📚</Text>
              <Text style={styles.statValue}>{getTotalLessonsRead()}</Text>
              <Text style={styles.statLabel}>Leçons lues</Text>
            </View>

            {/* Quiz complétés */}
            <View style={[styles.statCard, styles.quizStatCard]}>
              <Text style={styles.statIcon}>✏️</Text>
              <Text style={styles.statValue}>{getTotalQuizCompleted()}</Text>
              <Text style={styles.statLabel}>Quiz faits</Text>
            </View>
          </View>
        </View>

        {/* Badges obtenus */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Badges</Text>
            <Text style={styles.badgeCount}>
              {gamification.badges}/{gamification.totalBadges}
            </Text>
          </View>

          {unlockedBadgesDetails.length > 0 ? (
            <View style={styles.badgesContainer}>
              {unlockedBadgesDetails.map((badge) => (
                <View key={badge.id} style={styles.badgeCard}>
                  <View style={styles.badgeIconContainer}>
                    <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  </View>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>
                    {badge.description}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noBadgesCard}>
              <Text style={styles.noBadgesEmoji}>🎯</Text>
              <Text style={styles.noBadgesText}>
                Continue à apprendre pour débloquer des badges !
              </Text>
            </View>
          )}

          {/* Prochain badge à débloquer */}
          {gamification.badges < gamification.totalBadges && (
            <View style={styles.nextBadgeCard}>
              <Text style={styles.nextBadgeTitle}>Prochain badge</Text>
              <Text style={styles.nextBadgeText}>
                {BADGES.find(b => !unlockedBadges.includes(b.id))?.name || 'Badge mystère'}
              </Text>
            </View>
          )}
        </View>

        {/* Progression par matière */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression par Matière</Text>

          <View style={styles.subjectProgressCard}>
            <View style={styles.subjectRow}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectEmoji}>🧮</Text>
                <Text style={styles.subjectName}>Mathématiques</Text>
              </View>
              <Text style={styles.subjectPercentage}>{progress.bySubject.math}%</Text>
            </View>
            <View style={styles.progressBarSmall}>
              <View
                style={[
                  styles.progressBarFillSmall,
                  { width: `${progress.bySubject.math}%`, backgroundColor: '#4169E1' },
                ]}
              />
            </View>
          </View>

          <View style={styles.subjectProgressCard}>
            <View style={styles.subjectRow}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectEmoji}>📖</Text>
                <Text style={styles.subjectName}>Français</Text>
              </View>
              <Text style={styles.subjectPercentage}>{progress.bySubject.french}%</Text>
            </View>
            <View style={styles.progressBarSmall}>
              <View
                style={[
                  styles.progressBarFillSmall,
                  { width: `${progress.bySubject.french}%`, backgroundColor: '#E63946' },
                ]}
              />
            </View>
          </View>

          <View style={styles.subjectProgressCard}>
            <View style={styles.subjectRow}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectEmoji}>🌍</Text>
                <Text style={styles.subjectName}>Histoire-Géo</Text>
              </View>
              <Text style={styles.subjectPercentage}>{progress.bySubject.history}%</Text>
            </View>
            <View style={styles.progressBarSmall}>
              <View
                style={[
                  styles.progressBarFillSmall,
                  { width: `${progress.bySubject.history}%`, backgroundColor: '#06D6A0' },
                ]}
              />
            </View>
          </View>

          <View style={styles.subjectProgressCard}>
            <View style={styles.subjectRow}>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectEmoji}>🧪</Text>
                <Text style={styles.subjectName}>Sciences</Text>
              </View>
              <Text style={styles.subjectPercentage}>{progress.bySubject.sciences}%</Text>
            </View>
            <View style={styles.progressBarSmall}>
              <View
                style={[
                  styles.progressBarFillSmall,
                  { width: `${progress.bySubject.sciences}%`, backgroundColor: '#7209B7' },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>

      {/* Carte de partage invisible (pour la capture) */}
      <View style={styles.shareCardContainer}>
        <View ref={shareCardRef} collapsable={false}>
          <ShareableProgressCard
            user={user}
            gamification={gamification}
            progress={progress}
            stats={{
              lessonsRead: getTotalLessonsRead(),
              quizCompleted: getTotalQuizCompleted(),
            }}
          />
        </View>
      </View>
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
    paddingBottom: SPACING.xl,
  },

  // Header
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarLarge: {
    fontSize: 56,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shareButtonIcon: {
    fontSize: 16,
  },
  shareButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  shareCardContainer: {
    position: 'absolute',
    left: -9999,
    top: -9999,
  },

  // Premium Banner
  premiumBanner: {
    backgroundColor: '#FFD700',
    marginHorizontal: SPACING.md,
    marginTop: -SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  premiumBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  premiumBannerIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  premiumBannerText: {
    flex: 1,
  },
  premiumBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  premiumBannerSubtitle: {
    fontSize: 13,
    color: '#333',
  },
  premiumBannerArrow: {
    fontSize: 24,
    color: '#000',
  },
  premiumActiveBanner: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.md,
    marginTop: -SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumActiveIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  premiumActiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // Sections
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  badgeCount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  // Progression
  progressCard: {
    ...CARD_STYLES.default,
    padding: SPACING.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  // Statistiques
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  statCard: {
    width: '47%',
    ...CARD_STYLES.default,
    padding: SPACING.md,
    alignItems: 'center',
  },
  streakStatCard: {
    backgroundColor: '#FFF5F0',
  },
  badgesStatCard: {
    backgroundColor: '#FFFAED',
  },
  lessonsStatCard: {
    backgroundColor: '#F0F5FF',
  },
  quizStatCard: {
    backgroundColor: '#F0FFF4',
  },
  statIcon: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Badges
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  badgeCard: {
    width: '47%',
    ...CARD_STYLES.default,
    padding: SPACING.md,
    alignItems: 'center',
  },
  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.blueBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  badgeIcon: {
    fontSize: 32,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  noBadgesCard: {
    ...CARD_STYLES.default,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  noBadgesEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  noBadgesText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  nextBadgeCard: {
    backgroundColor: COLORS.blueBg,
    padding: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.md,
  },
  nextBadgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  nextBadgeText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  // Progression par matière
  subjectProgressCard: {
    ...CARD_STYLES.default,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  subjectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectEmoji: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  subjectPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  progressBarSmall: {
    height: 6,
    backgroundColor: COLORS.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFillSmall: {
    height: '100%',
    borderRadius: 3,
  },
});
