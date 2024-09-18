import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const LineItem = ({ item, index, onLineItemChange }) => (
  <View>
    <TextInput
      style={styles.input}
      placeholder="Item Name"
      value={item.name}
      onChangeText={(text) => onLineItemChange(index, "name", text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Quantity"
      keyboardType="numeric"
      value={item.quantity.toString()}
      onChangeText={(text) => onLineItemChange(index, "quantity", text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Units"
      value={item.units}
      onChangeText={(text) => onLineItemChange(index, "units", text)}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default LineItem;
