import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const [firstName, setFirstName] = useState("FIRSTNAME");
  const [lastName, setLastName] = useState("LASTNAME");
  const [email, setEmail] = useState("EXAMPLE@GMAIL.COM");
  const [bio, setBio] = useState("ABOUT YOURSELF");
  const [profileImage, setProfileImage] = useState(
    require("../assets/icons/person.png")
  );

  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickedImage.canceled) {
      setProfileImage({ uri: pickedImage.assets[0].uri });
    }
  };

  const handleUpdateName = () => {
    if (firstName.trim() === "" || lastName.trim() === "") {
      Alert.alert("Please enter both first and last names.");
      return;
    }

    console.log("Name Updated:", `${firstName} ${lastName}`);
    setIsEditingName(false);
  };

  const handleUpdateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    console.log("Email Updated:", email);
    setIsEditingEmail(false);
  };

  const handleUpdateBio = () => {
    if (bio.trim() === "") {
      Alert.alert("Bio cannot be empty.");
      return;
    }

    console.log("Bio Updated:", bio);
    setIsEditingBio(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={profileImage} style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
          <View style={styles.editButtonBackground}>
            <Text style={styles.editButtonText}>EDIT PICTURE</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>INFO</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>NAME</Text>
          {isEditingName ? (
            <>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="FIRST NAME"
              />
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="LAST NAME"
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateName}
              >
                <Text style={styles.updateButtonText}>UPDATE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoValue}>{`${firstName} ${lastName}`}</Text>
              <Text
                style={styles.editText}
                onPress={() => setIsEditingName(true)}
              >
                EDIT
              </Text>
            </>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>EMAIL</Text>
          {isEditingEmail ? (
            <>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ENTER EMAIL"
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateEmail}
              >
                <Text style={styles.updateButtonText}>UPDATE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoValue}>{email}</Text>
              <Text
                style={styles.editText}
                onPress={() => setIsEditingEmail(true)}
              >
                EDIT
              </Text>
            </>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>BIO</Text>
          {isEditingBio ? (
            <>
              <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                placeholder="ENTER BIO"
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateBio}
              >
                <Text style={styles.updateButtonText}>UPDATE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoValue}>{bio}</Text>
              <Text
                style={styles.editText}
                onPress={() => setIsEditingBio(true)}
              >
                EDIT
              </Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.socialAppSection}>
        <Text style={styles.sectionTitle}>CONNECTED SOCIAL APP</Text>
        <View style={styles.socialAppItem}>
          <Text style={styles.socialAppLabel}>GOOGLE</Text>
          <Text style={styles.linkedText}>LINKED</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e0e0e0",
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "black",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  editButtonBackground: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  editButtonText: {
    color: "#333",
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    paddingVertical: 4,
    fontSize: 14,
  },
  editText: {
    marginLeft: 300, 
    fontSize: 14,
    color: "#00f",
  },
  updateButton: {
    backgroundColor: "#333",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    alignSelf: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  socialAppSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  socialAppItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  socialAppLabel: {
    fontSize: 14,
    color: "#888",
  },
  linkedText: {
    fontSize: 14,
    color: "#f42d2d",
  },
});
