import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { COLORS, SPACING, DEFAULT_AVATARS } from '../utils/constants';

export default function EditProfileScreen({ navigation }) {
  const { user, updateProfile } = useUser();

  const [name, setName] = useState(user.name);
  const [selectedClass, setSelectedClass] = useState(user.class);
  const [school, setSchool] = useState(user.school);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  const classes = ['6ème', '5ème', '4ème', '3ème'];

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom ne peut pas être vide');
      return;
    }

    const newProfile = {
      name: name.trim(),
      avatar: selectedAvatar,
      class: selectedClass,
      school: school.trim(),
    };

    await updateProfile(newProfile);
    Alert.alert('Succès', 'Profil mis à jour !', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avatar</Text>
          <View style={styles.avatarsGrid}>
            {DEFAULT_AVATARS.map((avatar, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.avatarSelected,
                ]}
                onPress={() => setSelectedAvatar(avatar)}
              >
                <Text style={styles.avatarEmoji}>{avatar}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nom */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prénom et nom</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Entre ton nom"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Classe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classe</Text>
          <View style={styles.classesGrid}>
            {classes.map((className) => (
              <TouchableOpacity
                key={className}
                style={[
                  styles.classOption,
                  selectedClass === className && styles.classSelected,
                ]}
                onPress={() => setSelectedClass(className)}
              >
                <Text
                  style={[
                    styles.classText,
                    selectedClass === className && styles.classTextSelected,
                  ]}
                >
                  {className}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Établissement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Établissement (optionnel)</Text>
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
            placeholder="Collège Victor Hugo"
            placeholderTextColor={COLORS.textLight}
          />
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
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

  // Sections
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },

  // Avatar
  avatarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  avatarSelected: {
    borderColor: COLORS.primary,
    borderWidth: 3,
    backgroundColor: COLORS.blueBg,
  },
  avatarEmoji: {
    fontSize: 32,
  },

  // Input
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Classes
  classesGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  classOption: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  classSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.blueBg,
  },
  classText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  classTextSelected: {
    color: COLORS.primary,
  },

  // Boutons
  buttonsContainer: {
    marginTop: SPACING.lg,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
