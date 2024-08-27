import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../components/Api/Gql";


export default function Blog() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.characters.results.map((character) => (
        <View key={character.id} style={styles.characterContainer}>
          <Image source={{ uri: character.image }} style={styles.characterImage} />
          <Text style={styles.characterName}>{character.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 20,
  },
  characterContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Antonio",
  },
});
