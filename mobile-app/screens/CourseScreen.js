import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { coursesData } from '../data/coursesData';
import { useProgress } from '../contexts/ProgressContext';
import { useUser } from '../contexts/UserContext';
import { usePremium } from '../contexts/PremiumContext';

export default function CourseScreen({ navigation, route }) {
  const { subject, subjectName } = route.params;
  const courses = coursesData[subject] || [];
  const { completeLesson, isLessonCompleted } = useProgress();
  const { incrementDailyGoal } = useUser();
  const { isPremium, canAccessLesson, FREE_LESSONS_LIMIT } = usePremium();
  const [expandedCourse, setExpandedCourse] = useState(null);

  const toggleCourse = (index) => {
    const hasAccess = canAccessLesson(index);

    if (!hasAccess) {
      Alert.alert(
        'Contenu Premium 👑',
        `Les ${FREE_LESSONS_LIMIT} premiers cours sont gratuits. Passe à Premium pour débloquer tous les cours !`,
        [
          { text: 'Plus tard', style: 'cancel' },
          {
            text: 'Voir Premium',
            onPress: () => navigation.navigate('Premium')
          },
        ]
      );
      return;
    }

    setExpandedCourse(expandedCourse === index ? null : index);
  };

  const handleMarkAsCompleted = async (lessonIndex) => {
    const alreadyCompleted = isLessonCompleted(subject, lessonIndex);
    if (!alreadyCompleted) {
      await completeLesson(subject, lessonIndex);
      await incrementDailyGoal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subjectTitle}>{subjectName}</Text>

        {courses.map((course, index) => {
          const completed = isLessonCompleted(subject, index);
          const hasAccess = canAccessLesson(index);
          const isLocked = !hasAccess;

          return (
            <View key={index} style={styles.courseCard}>
              <TouchableOpacity
                style={[
                  styles.courseHeader,
                  isLocked && styles.courseHeaderLocked
                ]}
                onPress={() => toggleCourse(index)}
              >
                <View style={styles.courseTitleRow}>
                  {completed && <Text style={styles.checkMark}>✓</Text>}
                  {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
                  <Text style={[
                    styles.courseTitle,
                    completed && styles.completedTitle,
                    isLocked && styles.lockedTitle
                  ]}>
                    {course.title}
                  </Text>
                  {isLocked && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>👑 Premium</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.expandIcon}>
                  {expandedCourse === index ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>

              {expandedCourse === index && (
                <View style={styles.courseContent}>
                  <Text style={styles.courseText}>{course.content}</Text>

                  {course.keyPoints && (
                    <View style={styles.keyPointsContainer}>
                      <Text style={styles.keyPointsTitle}>Points clés :</Text>
                      {course.keyPoints.map((point, idx) => (
                        <Text key={idx} style={styles.keyPoint}>
                          • {point}
                        </Text>
                      ))}
                    </View>
                  )}

                  {course.examples && (
                    <View style={styles.examplesContainer}>
                      <Text style={styles.examplesTitle}>Exemples :</Text>
                      {course.examples.map((example, idx) => (
                        <Text key={idx} style={styles.example}>
                          {example}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Bouton "J'ai compris" */}
                  {!completed && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => handleMarkAsCompleted(index)}
                    >
                      <Text style={styles.completeButtonText}>
                        ✓ J'ai compris cette leçon
                      </Text>
                    </TouchableOpacity>
                  )}

                  {completed && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>
                        ✓ Leçon complétée
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}

        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { subject, subjectName })}
        >
          <Text style={styles.quizButtonText}>
            ✏️ Tester mes connaissances avec un quiz
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    padding: 20,
  },
  subjectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkMark: {
    fontSize: 18,
    color: '#27AE60',
    marginRight: 8,
    fontWeight: 'bold',
  },
  lockIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  completedTitle: {
    color: '#27AE60',
  },
  lockedTitle: {
    opacity: 0.6,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000',
  },
  courseHeaderLocked: {
    backgroundColor: '#95A5A6',
  },
  completeButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  completedBadgeText: {
    color: '#27AE60',
    fontSize: 14,
    fontWeight: '600',
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#4A90E2',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  expandIcon: {
    fontSize: 16,
    color: '#fff',
  },
  courseContent: {
    padding: 15,
  },
  courseText: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 22,
    marginBottom: 15,
  },
  keyPointsContainer: {
    backgroundColor: '#E8F4F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  keyPointsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  keyPoint: {
    fontSize: 13,
    color: '#34495E',
    marginBottom: 5,
    paddingLeft: 5,
  },
  examplesContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    padding: 12,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  example: {
    fontSize: 13,
    color: '#7F6C00',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  quizButton: {
    backgroundColor: '#27AE60',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
