import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const CheckInScreen = ({ navigation }) => {
  const [toggles, setToggles] = useState({
    meditate: true,
    health: true,
    sleep: true,
    savor: true,
    unplug: true,
    socialize: true,
  });

  const toggleSwitch = (name) => {
    setToggles({ ...toggles, [name]: !toggles[name] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Check Ins</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.checkInList}>
        {[
          { name: 'meditate', label: 'MEDITATE', icon: 'brain' },
          { name: 'health', label: 'HEALTH', icon: 'heartbeat' },
          { name: 'sleep', label: 'SLEEP', icon: 'bed' },
          { name: 'savor', label: 'SAVOR', icon: 'utensils' },
          { name: 'unplug', label: 'UNPLUG', icon: 'plug' },
          { name: 'socialize', label: 'SOCIALIZE', icon: 'users' },
        ].map((item, index) => (
          <View key={index} style={styles.checkInItem}>
            <View style={styles.checkInItemText}>
              <FontAwesome5 name={item.icon} size={24} color="black" />
              <Text style={styles.checkInLabel}>{item.label}</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={toggles[item.name] ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => toggleSwitch(item.name)}
              value={toggles[item.name]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkInList: {
    borderRadius: 10,
    borderColor: '#B0C4DE',
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#FFF',
  },
  checkInItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  checkInItemText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkInLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckInScreen;
