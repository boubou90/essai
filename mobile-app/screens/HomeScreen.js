import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#357ABD', '#2E5F8F']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.emoji}>📚</Text>
          <Text style={styles.title}>Bienvenue !</Text>
          <Text style={styles.subtitle}>
            Révise tes cours et teste tes connaissances
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Subjects')}
            >
              <Text style={styles.buttonText}>🎯 Commencer à réviser</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Subjects', { quizMode: true })}
            >
              <Text style={styles.buttonTextSecondary}>✏️ Faire un quiz</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>🧮</Text>
              <Text style={styles.infoText}>Mathématiques</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>📖</Text>
              <Text style={styles.infoText}>Français</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoEmoji}>🌍</Text>
              <Text style={styles.infoText}>Histoire-Géo</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#E8F4F8',
    marginBottom: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 40,
  },
  buttonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextSecondary: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  infoCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    minWidth: 90,
  },
  infoEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
