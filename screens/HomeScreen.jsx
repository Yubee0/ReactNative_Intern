import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/home-background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
        style={styles.overlay}
      >
        <Text style={styles.title}>Welcome to the Home Screen</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("blog")}
        >
          <LinearGradient
            colors={["#00B4DB", "#0083B0"]}
            style={styles.buttonBackground}
          >
            <Ionicons name="book-outline" size={24} color="#fff" style={styles.icon} />
            <View style={styles.separator} />
            <Text style={styles.buttonText}>Go to Blog Page</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("order")}
        >
          <LinearGradient
            colors={["#00B4DB", "#0083B0"]}
            style={styles.buttonBackground}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" style={styles.icon} />
            <View style={styles.separator} />
            <Text style={styles.buttonText}>Create New Order</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("driver")}
        >
          <LinearGradient
            colors={["#00B4DB", "#0083B0"]}
            style={styles.buttonBackground}
          >
            <FontAwesome6 name="truck-droplet" size={24} color="#fff" style={styles.icon} />
            <View style={styles.separator} />
            <Text style={styles.buttonText}>Pending Orders</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("orderlist")}
        >
          <LinearGradient
            colors={["#00B4DB", "#0083B0"]}
            style={styles.buttonBackground}
          >
            <Ionicons name="list-outline" size={24} color="#fff" style={styles.icon} />
            <View style={styles.separator} />
            <Text style={styles.buttonText}>Order List</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Antonio",
    marginBottom: 50,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  button: {
    width: "80%",
    marginVertical: 12,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", 
    paddingVertical: 15,
    paddingLeft: 8,
    borderRadius: 25,
    width: "100%",
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  icon: {
    width: 40, 
    textAlign: "center", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.25,
    marginLeft: 10, 
  },
});
