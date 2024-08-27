import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";


const SettingItem = ({ icon, title, name }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate(name)}
    >
      <Image source={icon} style={styles.settingIcon} />
      <Text style={styles.settingText}>{title}</Text>
    </TouchableOpacity>
  );
};


export default function SettingScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <SettingItem
          icon={require("../assets/icons/person.png")}
          title="PROFILE"
          name="profile"
          
        />
        <SettingItem
          icon={require("../assets/icons/wink.png")}
          title="CHECK IN PREFERENCE"
          name="check_in"
        />
        <SettingItem
          icon={require("../assets/icons/lock.png")}
          title="SECURITY & DATA"
          name="security"
        />
        <SettingItem
          icon={require("../assets/icons/progress.png")}
          title="APPEARANCE"
          name="appearance"
        />
        <SettingItem
          icon={require("../assets/icons/notification.png")}
          title="NOTIFICATIONS"
          name="notification"
        />
        <SettingItem
          icon={require("../assets/icons/speaker.png")}
          title="SOUND & VIBRATIONS"
          name="sound"
        />
      </View>

      <View style={styles.helpSection}>
        <Text style={styles.helpText}>HELP & SUPPORT</Text>
      </View>

      <View style={styles.section}>
        <SettingItem
          icon={require("../assets/icons/help.png")}
          title="HELP CENTER"
        />
        <SettingItem
          icon={require("../assets/icons/chat.png")}
          title="SEND FEEDBACK"
        />
        <SettingItem
          icon={require("../assets/icons/star.png")}
          title="RATE US"
        />
        <SettingItem
          icon={require("../assets/icons/share.png")}
          title="SHARE THE APP"
        />
      </View>

      <View style={styles.section}>
        <SettingItem
          icon={require("../assets/icons/licensedraft.png")}
          title="TERMS OF USE"
        />
        <SettingItem
          icon={require("../assets/icons/unlocked.png")}
          title="PRIVACY POLICY"
        />
      </View>

      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>SIGN OUT</Text>
      </TouchableOpacity>

      <View style={styles.versionSection}>
        <Text style={styles.versionText}>VERSION V7.9</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
   paddingTop: 20,
    flex: 1,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 24,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  settingIcon: {
    width: 24,
    height: 24,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 20,
  },

  helpSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  helpText: {
    fontSize: 14,
    fontFamily: "JetBrains Mono",
    fontWeight: "300",
    letterSpacing: 0.32,
  },
  signOutButton: {
    backgroundColor: "#f42d2d",
    borderRadius: 200,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
  },
  versionSection: {
    alignItems: "center",
    paddingtop: 6,
    paddingBottom:30,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 24,
    borderRadius: 12,
  },
  versionText: {
    fontSize: 14,
    fontFamily: "JetBrains Mono",
    fontWeight: "200",
    letterSpacing: 0.32,
  },
});
