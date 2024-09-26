import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from '@expo/vector-icons/AntDesign';
import LineItem from './lineItem';

const OrderForm = ({
  orderInfo,
  onOrderChange,
  onDeliveryOrderChange,
  onLineItemChange,
  onDatePress,
  onSubmit,
  customers,
  branches,
  products,
  drivers,
  assets,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create a New Order</Text>

      <RNPickerSelect
        onValueChange={(value) => onOrderChange("customerId", value)}
        items={customers.map((customer) => ({
          label: customer.name,
          value: customer.id,
        }))}
        placeholder={{ label: "Select Customer", value: null }}
        value={orderInfo.customerId}
        style={pickerStyles}
      />

      <TouchableOpacity onPress={() => onDatePress("startedAt")} style={styles.datePickerContainer}>
        <AntDesign name="calendar" size={24} color="black" style={styles.icon} />
        <Text style={styles.input}>
          {orderInfo.startedAt ? new Date(orderInfo.startedAt).toLocaleString() : " Select Start Date"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDatePress("deliveryOrderAttributes.plannedAt")} style={styles.datePickerContainer}>
        <AntDesign name="calendar" size={24} color="black" style={styles.icon} />
        <Text style={styles.input}>
          {orderInfo.deliveryOrderAttributes.plannedAt
            ? new Date(orderInfo.deliveryOrderAttributes.plannedAt).toLocaleString()
            : new Date().toLocaleString()} 
        </Text>
      </TouchableOpacity>


      <RNPickerSelect
        onValueChange={(value) => onDeliveryOrderChange("customerBranchId", value)}
        items={branches.map((branch) => ({
          label: branch.name,
          value: branch.id,
        }))}
        placeholder={{ label: "Select Customer Branch", value: null }}
        value={orderInfo.deliveryOrderAttributes.customerBranchId}
        style={pickerStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => onDeliveryOrderChange("assetId", value)}
        items={assets.map((asset) => ({
          label: asset.assetCategory,
          value: asset.id,
        }))}
        placeholder={{ label: "Select Asset", value: null }}
        value={orderInfo.deliveryOrderAttributes.assetId} 
        style={pickerStyles}
      />

      <RNPickerSelect
        onValueChange={(value) => onDeliveryOrderChange("driverId", value)}
        items={drivers.map((driver) => ({
          label: driver.name,
          value: driver.id,
        }))}
        placeholder={{ label: "Select Driver", value: null }}
        value={orderInfo.deliveryOrderAttributes.driverId}
        style={pickerStyles}
      />

      {orderInfo.deliveryOrderAttributes.lineItemsAttributes.map((item, index) => (
        <LineItem
          key={index}
          item={item}
          index={index}
          onLineItemChange={onLineItemChange}
          products={products}
        />
      ))}

      <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Create Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

const pickerStyles = {
  inputIOS: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
};

export default OrderForm;
