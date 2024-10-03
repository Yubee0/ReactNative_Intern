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
    backgroundColor: '#B7B7B7',
    flex: 1,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#1A4D2E',
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
    marginLeft:50,
    marginRight:50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});

const pickerStyles = {
  inputIOS: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    color: '#333333',
  },
  inputAndroid: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    color: '#333333',
  },
};

export default OrderForm;
