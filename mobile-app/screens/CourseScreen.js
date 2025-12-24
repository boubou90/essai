import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { coursesData } from '../data/coursesData';

export default function CourseScreen({ navigation, route }) {
  const { subject, subjectName } = route.params;
  const courses = coursesData[subject] || [];
  const [expandedCourse, setExpandedCourse] = useState(null);

  const toggleCourse = (index) => {
    setExpandedCourse(expandedCourse === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subjectTitle}>{subjectName}</Text>

        {courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <TouchableOpacity
              style={styles.courseHeader}
              onPress={() => toggleCourse(index)}
            >
              <Text style={styles.courseTitle}>{course.title}</Text>
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
              </View>
            )}
          </View>
        ))}

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
