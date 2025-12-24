import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function ResultsScreen({ navigation, route }) {
  const { score, total, subject, answers } = route.params;
  const percentage = Math.round((score / total) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) {
      return {
        emoji: '🏆',
        title: 'Excellent !',
        message: 'Tu maîtrises parfaitement cette matière !',
        color: '#27AE60',
      };
    } else if (percentage >= 60) {
      return {
        emoji: '👍',
        title: 'Bien joué !',
        message: 'Continue comme ça, tu progresses bien !',
        color: '#3498DB',
      };
    } else if (percentage >= 40) {
      return {
        emoji: '📚',
        title: 'Pas mal !',
        message: 'Révise encore un peu pour t\'améliorer.',
        color: '#F39C12',
      };
    } else {
      return {
        emoji: '💪',
        title: 'Continue tes efforts !',
        message: 'N\'hésite pas à relire le cours et réessayer.',
        color: '#E74C3C',
      };
    }
  };

  const result = getResultMessage();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.resultHeader, { backgroundColor: result.color }]}>
          <Text style={styles.resultEmoji}>{result.emoji}</Text>
          <Text style={styles.resultTitle}>{result.title}</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Ton score</Text>
          <Text style={styles.scoreValue}>
            {score} / {total}
          </Text>
          <Text style={styles.percentageValue}>{percentage}%</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Détails de tes réponses</Text>

          {answers && answers.map((answer, index) => (
            <View
              key={index}
              style={[
                styles.answerDetail,
                answer.isCorrect ? styles.correctDetail : styles.wrongDetail,
              ]}
            >
              <View style={styles.answerHeader}>
                <Text style={styles.answerIcon}>
                  {answer.isCorrect ? '✅' : '❌'}
                </Text>
                <Text style={styles.questionNumber}>Question {index + 1}</Text>
              </View>
              <Text style={styles.questionTextSmall}>{answer.question}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('Subjects', { quizMode: true })}
          >
            <Text style={styles.retryButtonText}>
              🔄 Refaire un quiz
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.courseButton}
            onPress={() => navigation.navigate('Subjects')}
          >
            <Text style={styles.courseButtonText}>
              📖 Réviser les cours
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.homeButtonText}>
              🏠 Retour à l'accueil
            </Text>
          </TouchableOpacity>
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
  resultHeader: {
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  resultMessage: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  answerDetail: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  correctDetail: {
    backgroundColor: '#D4EDDA',
    borderLeftColor: '#28A745',
  },
  wrongDetail: {
    backgroundColor: '#F8D7DA',
    borderLeftColor: '#DC3545',
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  answerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  questionTextSmall: {
    fontSize: 13,
    color: '#34495E',
  },
  actionsContainer: {
    marginTop: 10,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseButton: {
    backgroundColor: '#27AE60',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  courseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: 'transparent',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  homeButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
