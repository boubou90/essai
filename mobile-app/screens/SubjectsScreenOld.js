import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const subjects = [
  {
    id: 'math',
    name: 'Mathématiques',
    emoji: '🧮',
    color: '#FF6B6B',
    topics: ['Algèbre', 'Géométrie', 'Nombres', 'Calcul'],
  },
  {
    id: 'french',
    name: 'Français',
    emoji: '📖',
    color: '#4ECDC4',
    topics: ['Grammaire', 'Conjugaison', 'Orthographe', 'Vocabulaire'],
  },
  {
    id: 'history',
    name: 'Histoire-Géographie',
    emoji: '🌍',
    color: '#95E1D3',
    topics: ['Histoire', 'Géographie', 'Repères historiques', 'Cartes'],
  },
];

export default function SubjectsScreen({ navigation, route }) {
  const quizMode = route.params?.quizMode || false;

  const handleSubjectPress = (subject) => {
    if (quizMode) {
      navigation.navigate('Quiz', { subject: subject.id, subjectName: subject.name });
    } else {
      navigation.navigate('Course', { subject: subject.id, subjectName: subject.name });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>
          {quizMode ? 'Choisis ta matière pour le quiz' : 'Choisis une matière à réviser'}
        </Text>

        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[styles.subjectCard, { borderLeftColor: subject.color }]}
            onPress={() => handleSubjectPress(subject)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.emoji}>{subject.emoji}</Text>
              <View style={styles.cardContent}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.topicsText}>
                  {subject.topics.join(' • ')}
                </Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.tipContainer}>
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={styles.tipText}>
            Révise régulièrement pour mieux mémoriser !
          </Text>
        </View>
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  subjectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 40,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  topicsText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  arrow: {
    fontSize: 24,
    color: '#BDC3C7',
  },
  tipContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#7F6C00',
    flex: 1,
  },
});
