import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useProgress } from '../contexts/ProgressContext';
import { COLORS, SPACING, SUBJECTS, CARD_STYLES } from '../utils/constants';
import { coursesData } from '../data/coursesData';

export default function SubjectsScreen({ navigation, route }) {
  const quizMode = route.params?.quizMode || false;
  const selectedSubject = route.params?.selectedSubject || null;

  const { progress, getSubjectStats } = useProgress();
  const [searchText, setSearchText] = useState('');

  // Si une matière spécifique est sélectionnée depuis HomeScreen
  if (selectedSubject) {
    const subject = SUBJECTS[selectedSubject];
    navigation.navigate('Course', {
      subject: subject.id,
      subjectName: subject.name,
    });
    return null;
  }

  const handleSubjectPress = (subject) => {
    if (quizMode) {
      navigation.navigate('Quiz', {
        subject: subject.id,
        subjectName: subject.name,
      });
    } else {
      navigation.navigate('Course', {
        subject: subject.id,
        subjectName: subject.name,
      });
    }
  };

  // Filtrer les matières selon la recherche
  const filteredSubjects = Object.values(SUBJECTS).filter((subject) =>
    subject.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une matière..."
            placeholderTextColor={COLORS.textLight}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Titre */}
        <Text style={styles.headerText}>
          {quizMode
            ? 'Choisis ta matière pour le quiz'
            : 'Choisis une matière à réviser'}
        </Text>

        {/* Liste des matières */}
        {filteredSubjects.map((subject) => {
          const stats = getSubjectStats(subject.id);
          const subjectProgress = progress.bySubject[subject.id] || 0;

          return (
            <TouchableOpacity
              key={subject.id}
              style={[styles.subjectCard, { backgroundColor: subject.bgColor }]}
              onPress={() => handleSubjectPress(subject)}
            >
              {/* Header de la carte */}
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: subject.color },
                  ]}
                >
                  <Text style={styles.emoji}>{subject.icon}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.lessonsInfo}>
                    {stats.completedLessons}/{stats.totalLessons} leçons •{' '}
                    {stats.completedQuiz}/{stats.totalQuiz} quiz
                  </Text>
                </View>
                <Text style={styles.arrow}>→</Text>
              </View>

              {/* Barre de progression */}
              <View style={styles.progressSection}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>Progression</Text>
                  <Text style={[styles.progressPercentage, { color: subject.color }]}>
                    {subjectProgress}%
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${subjectProgress}%`,
                        backgroundColor: subject.color,
                      },
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Message si aucun résultat */}
        {filteredSubjects.length === 0 && (
          <View style={styles.noResultsCard}>
            <Text style={styles.noResultsEmoji}>🔍</Text>
            <Text style={styles.noResultsText}>
              Aucune matière trouvée
            </Text>
          </View>
        )}

        {/* Conseil */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            {quizMode
              ? 'Fais des quiz régulièrement pour mieux mémoriser !'
              : 'Révise régulièrement pour progresser plus vite !'}
          </Text>
        </View>

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

  // Recherche
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    ...CARD_STYLES.default,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  // Header
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },

  // Carte matière
  subjectCard: {
    ...CARD_STYLES.default,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  emoji: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  lessonsInfo: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  arrow: {
    fontSize: 24,
    color: COLORS.textLight,
  },

  // Progression
  progressSection: {
    marginTop: SPACING.sm,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Pas de résultats
  noResultsCard: {
    ...CARD_STYLES.default,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  // Conseil
  tipContainer: {
    backgroundColor: COLORS.blueBg,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.primary,
    flex: 1,
    fontWeight: '500',
  },
});
