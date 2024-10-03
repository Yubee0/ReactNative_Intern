import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const LineItem = ({ item, index, onLineItemChange, products }) => (
  <View style={styles.lineItemContainer}>
    <View style={styles.productPickerContainer}>
      <RNPickerSelect
        onValueChange={(value) => onLineItemChange(index, "name", value)}
        items={products.map((product) => ({
          label: product.name,
          value: product.name,
        }))}
        placeholder={{ label: "Select Product", value: null }}
        value={item.name}
        style={pickerProductStyles} // Separate styles for the product picker
      />
    </View>

    <View style={styles.horizontalContainer}>
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={item.quantity.toString()}
        onChangeText={(text) => {
          const numericValue = text === '' ? 0 : parseFloat(text);
          if (!isNaN(numericValue)) {
            onLineItemChange(index, "quantity", numericValue);
          }
        }}
      />
      <View style={styles.pickerContainer}>
      <RNPickerSelect
        onValueChange={(itemValue) => onLineItemChange(index, 'units', itemValue)}
        items={[
          { label: 'Liters', value: 'liters' },
          { label: 'Gallons', value: 'gallons' },
          { label: 'KiloLiters', value: 'kiloliters' },
        ]}
        value={item.units}
        placeholder={{ label: "Units", value: null }} 
        style={pickerStyles}
      />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  lineItemContainer: {
    marginBottom: 15,
  },
  productPickerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 0.45,
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flex: 0.45,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

const pickerProductStyles = {
  inputAndroid: {
    height: 45,
    paddingLeft: 8,
    color: '#333333',
  },
};

const pickerStyles = {
  inputAndroid: {
    height: 45,
    paddingLeft: 8,
    color: '#333333',
  },
};

export default LineItem;
