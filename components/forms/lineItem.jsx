import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const LineItem = ({ item, index, onLineItemChange, products }) => (
  <View>
    <RNPickerSelect
      onValueChange={(value) => onLineItemChange(index, "name", value)}
      items={products.map((product) => ({
        label: product.name,
        value: product.name,
      }))}
      placeholder={{ label: "Select Product", value: null }}
      value={item.name} 
    />
      <TextInput
      style={styles.input}
      placeholder="Quantity"
      keyboardType="numeric"
      value={item.quantity.toString()} 
      onChangeText={(text) => {
        const numericValue = text === '' ? 0 : parseFloat(text);
        if (!isNaN(numericValue)) { onLineItemChange(index, "quantity", numericValue);
        }
      }}
    />

      <RNPickerSelect
        onValueChange={(itemValue) => onLineItemChange(index, 'units', itemValue)}
        items={[
          { label: 'Liters', value: 'liters' },
          { label: 'Gallons', value: 'gallons' },
          { label: 'KiloLiters', value: 'kiloliters' },
        ]}
        value={item.units}
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
