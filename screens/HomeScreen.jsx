import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/home-background.jpg")} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to the Home Screen</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("blog")}
        >
          <Ionicons name="book-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Go to Blog Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("order")}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Create New Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("orderlist")}
        >
          <Ionicons name="list-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Order List</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Antonio",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Antonio",
    fontWeight: "bold",
    marginLeft: 10, 
  },
});
