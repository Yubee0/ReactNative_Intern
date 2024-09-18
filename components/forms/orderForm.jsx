import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import LineItem from './lineItem';

const OrderForm = ({
  orderInfo,
  onOrderChange,
  onDeliveryOrderChange,
  onLineItemChange,
  addLineItem,
  onDatePress,
  onSubmit
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create a New Order</Text>

      <TextInput
        style={styles.input}
        placeholder="Customer ID"
        value={orderInfo.customerId}
        onChangeText={(text) => onOrderChange("customerId", text)}
      />

      <TouchableOpacity onPress={() => onDatePress("startedAt")}>
        <TextInput
          style={styles.input}
          placeholder="Started At"
          value={orderInfo.startedAt ? new Date(orderInfo.startedAt).toLocaleString() : ""}
          editable={false}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDatePress("completedAt")}>
        <TextInput
          style={styles.input}
          placeholder="Completed At"
          value={orderInfo.completedAt ? new Date(orderInfo.completedAt).toLocaleString() : ""}
          editable={false}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDatePress("deliveryOrderAttributes.plannedAt")}>
        <TextInput
          style={styles.input}
          placeholder="Planned At"
          value={orderInfo.deliveryOrderAttributes.plannedAt ? new Date(orderInfo.deliveryOrderAttributes.plannedAt).toLocaleString() : ""}
          editable={false}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Customer Branch ID"
        value={orderInfo.deliveryOrderAttributes.customerBranchId}
        onChangeText={(text) => onDeliveryOrderChange("customerBranchId", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Asset ID"
        value={orderInfo.deliveryOrderAttributes.assetId}
        onChangeText={(text) => onDeliveryOrderChange("assetId", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Driver ID"
        value={orderInfo.deliveryOrderAttributes.driverId}
        onChangeText={(text) => onDeliveryOrderChange("driverId", text)}
      />

      {orderInfo.deliveryOrderAttributes.lineItemsAttributes.map((item, index) => (
        <LineItem key={index} index={index} item={item} onLineItemChange={onLineItemChange} />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addLineItem}>
        <Text style={styles.buttonText}>Add Line Item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Create Order</Text>
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default OrderForm;
