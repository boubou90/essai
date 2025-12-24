import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { quizData } from '../data/quizData';

export default function QuizScreen({ navigation, route }) {
  const { subject, subjectName } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const subjectQuestions = quizData[subject] || [];
    // Mélanger les questions
    const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10)); // Prendre 10 questions
  }, [subject]);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement du quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Déjà répondu

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        userAnswer: answerIndex,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz terminé
      navigation.navigate('Results', {
        score,
        total: questions.length,
        subject: subjectName,
        answers: answeredQuestions,
      });
    }
  };

  const getAnswerStyle = (index) => {
    if (selectedAnswer === null) {
      return styles.answerButton;
    }

    if (index === currentQuestion.correctAnswer) {
      return [styles.answerButton, styles.correctAnswer];
    }

    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
      return [styles.answerButton, styles.wrongAnswer];
    }

    return [styles.answerButton, styles.disabledAnswer];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.subjectName}>{subjectName}</Text>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} / {questions.length}
          </Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score : {score}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.answersContainer}>
          {currentQuestion.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={getAnswerStyle(index)}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text
                style={[
                  styles.answerText,
                  selectedAnswer !== null && styles.answerTextDisabled,
                ]}
              >
                {answer}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showExplanation && currentQuestion.explanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === currentQuestion.correctAnswer
                ? '✅ Bravo !'
                : '❌ Pas tout à fait...'}
            </Text>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )}

        {selectedAnswer !== null && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1
                ? 'Question suivante →'
                : 'Voir les résultats 🎯'}
            </Text>
          </TouchableOpacity>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#7F8C8D',
  },
  header: {
    marginBottom: 20,
  },
  subjectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  scoreContainer: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  questionCard: {
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
  questionText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    fontWeight: '600',
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  correctAnswer: {
    backgroundColor: '#D4EDDA',
    borderColor: '#28A745',
  },
  wrongAnswer: {
    backgroundColor: '#F8D7DA',
    borderColor: '#DC3545',
  },
  disabledAnswer: {
    opacity: 0.6,
  },
  answerText: {
    fontSize: 15,
    color: '#2C3E50',
  },
  answerTextDisabled: {
    color: '#7F8C8D',
  },
  explanationCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#7F6C00',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
