import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { usePremium } from '../contexts/PremiumContext';
import { COLORS, SPACING } from '../utils/constants';

export default function PremiumScreen({ navigation }) {
  const { isPremium, activatePremium, deactivatePremium } = usePremium();

  const handleUpgrade = async () => {
    // Dans une vraie app, ici on intégrerait le système de paiement
    // (Apple In-App Purchase ou Google Play Billing)
    Alert.alert(
      'Passer à Premium',
      'Dans la version finale, ceci ouvrira le système de paiement. Pour l\'instant, nous allons activer Premium gratuitement pour le test.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Activer Premium',
          onPress: async () => {
            const success = await activatePremium();
            if (success) {
              Alert.alert(
                'Félicitations ! 🎉',
                'Tu as maintenant accès à tous les cours et quiz !',
                [{ text: 'Super !', onPress: () => navigation.goBack() }]
              );
            }
          },
        },
      ]
    );
  };

  const handleTestFree = async () => {
    // Pour les tests : repasser en mode gratuit
    await deactivatePremium();
    Alert.alert('Mode gratuit activé', 'Tu es maintenant en version gratuite.');
  };

  const features = [
    {
      icon: '📚',
      title: 'Tous les cours',
      description: 'Accès illimité à tous les cours de toutes les matières',
      free: 'Limité à 2 cours par matière',
    },
    {
      icon: '✏️',
      title: 'Quiz illimités',
      description: 'Tous les quiz pour tester tes connaissances',
      free: 'Non disponible',
    },
    {
      icon: '📊',
      title: 'Statistiques avancées',
      description: 'Suivi détaillé de ta progression',
      free: 'Statistiques basiques',
    },
    {
      icon: '🎯',
      title: 'Badges exclusifs',
      description: 'Débloque des badges réservés aux membres Premium',
      free: 'Badges limités',
    },
    {
      icon: '📥',
      title: 'Cours hors-ligne',
      description: 'Télécharge les cours pour réviser sans internet',
      free: 'Non disponible',
    },
    {
      icon: '🚫',
      title: 'Sans publicité',
      description: 'Profite d\'une expérience sans interruption',
      free: 'Avec publicités',
    },
  ];

  if (isPremium) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Premium actif */}
          <View style={styles.premiumActiveHeader}>
            <Text style={styles.premiumActiveEmoji}>👑</Text>
            <Text style={styles.premiumActiveTitle}>Tu es Premium !</Text>
            <Text style={styles.premiumActiveText}>
              Tu as accès à tous les contenus de l'application
            </Text>
          </View>

          {/* Avantages actifs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tes avantages</Text>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCardActive}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
                <Text style={styles.checkMark}>✓</Text>
              </View>
            ))}
          </View>

          {/* Bouton de test pour repasser en gratuit */}
          <TouchableOpacity
            style={styles.testButton}
            onPress={handleTestFree}
          >
            <Text style={styles.testButtonText}>
              [Test] Repasser en mode gratuit
            </Text>
          </TouchableOpacity>

          <View style={{ height: SPACING.xl }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>👑</Text>
          <Text style={styles.headerTitle}>Passe à Premium</Text>
          <Text style={styles.headerSubtitle}>
            Débloque tous les cours et quiz pour réussir ton année !
          </Text>
        </View>

        {/* Prix */}
        <View style={styles.pricingCard}>
          <View style={styles.pricingHeader}>
            <Text style={styles.pricingBadge}>OFFRE DE LANCEMENT</Text>
          </View>
          <Text style={styles.price}>1,99€</Text>
          <Text style={styles.pricePeriod}>Paiement unique</Text>
          <Text style={styles.priceNote}>À toi pour toujours</Text>
        </View>

        {/* Comparaison Gratuit vs Premium */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tout ce que tu obtiens</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureHeader}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
              <View style={styles.comparisonRow}>
                <View style={styles.comparisonItem}>
                  <Text style={styles.comparisonLabel}>Gratuit</Text>
                  <Text style={styles.comparisonValue}>{feature.free}</Text>
                </View>
                <View style={[styles.comparisonItem, styles.premiumComparison]}>
                  <Text style={styles.comparisonLabelPremium}>Premium</Text>
                  <Text style={styles.comparisonValuePremium}>✓ Inclus</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Témoignages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce qu'en pensent les élèves</Text>

          <View style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <Text style={styles.testimonialAvatar}>👧</Text>
              <View>
                <Text style={styles.testimonialName}>Marie, 3ème</Text>
                <Text style={styles.testimonialStars}>⭐⭐⭐⭐⭐</Text>
              </View>
            </View>
            <Text style={styles.testimonialText}>
              "Grâce aux quiz Premium, j'ai progressé de 3 points en maths ! Je recommande à tous mes amis."
            </Text>
          </View>

          <View style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <Text style={styles.testimonialAvatar}>👦</Text>
              <View>
                <Text style={styles.testimonialName}>Lucas, 4ème</Text>
                <Text style={styles.testimonialStars}>⭐⭐⭐⭐⭐</Text>
              </View>
            </View>
            <Text style={styles.testimonialText}>
              "Les cours sont super bien expliqués. J'adore pouvoir réviser même sans internet !"
            </Text>
          </View>
        </View>

        {/* Bouton d'upgrade */}
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
          <Text style={styles.upgradeButtonText}>
            🚀 Passer à Premium maintenant
          </Text>
        </TouchableOpacity>

        {/* Note légale */}
        <Text style={styles.legalNote}>
          En continuant, tu acceptes nos conditions d'utilisation.
          Achat unique, pas d'abonnement. Accès illimité à vie.
        </Text>

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
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  headerEmoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },

  // Pricing
  pricingCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  pricingHeader: {
    backgroundColor: COLORS.badge,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: SPACING.md,
  },
  pricingBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  pricePeriod: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: SPACING.sm,
  },
  priceNote: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  // Section
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },

  // Features
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  comparisonRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  comparisonItem: {
    flex: 1,
    padding: SPACING.sm,
  },
  premiumComparison: {
    backgroundColor: COLORS.blueBg,
    borderRadius: 8,
  },
  comparisonLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  comparisonValue: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  comparisonLabelPremium: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  comparisonValuePremium: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  // Premium actif
  premiumActiveHeader: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  premiumActiveEmoji: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  premiumActiveTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  premiumActiveText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  featureCardActive: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkMark: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // Témoignages
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  testimonialAvatar: {
    fontSize: 40,
    marginRight: SPACING.sm,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  testimonialStars: {
    fontSize: 12,
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // Boutons
  upgradeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  upgradeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  testButton: {
    backgroundColor: COLORS.textLight,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  testButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },

  // Note légale
  legalNote: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
});
