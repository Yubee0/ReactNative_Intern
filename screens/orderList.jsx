import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../components/Api/getOrderQuery";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';

const OrderListScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching orders: {error.message}</Text>
      </View>
    );
  }

  const orders = data?.getOrders?.orders || [];

  const filteredOrders = orders.filter(order =>
    moment(order.startedAt).isSame(selectedDate, 'day')
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{moment(selectedDate).format('YYYY-MM-DD')}</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <AntDesign name="calendar" size={18} color="white" />
          <Text style={styles.dateButtonText}>Select Date</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>Order #: {item.id}</Text>
              <Text style={styles.status(item.status)}>{item.status}</Text>
            </View>
        
            <View style={styles.divider} />
        
            <View style={styles.detailsContainer}>
              <Text style={styles.cardLabel}>Customer:</Text>
              <Text style={styles.cardText}>{item.customer?.name || "N/A"}</Text>
        
              <Text style={styles.cardLabel}>Customer Email:</Text>
              <Text style={styles.cardText}>{item.customer?.email || "N/A"}</Text>
        
              <Text style={styles.cardLabel}>Organization ID:</Text>
              <Text style={styles.cardText}>{item.organizationId}</Text>
        
              <Text style={styles.cardLabel}>Planned At:</Text>
              <Text style={styles.cardText}>{item.deliveryOrder?.plannedAt ? moment(item.deliveryOrder.plannedAt).format('MMMM Do YYYY, h:mm A') : "N/A"}</Text>
        
              <Text style={styles.cardLabel}>Delivery Date:</Text>
              <Text style={styles.cardText}>{item.startedAt ? moment(item.startedAt).format('MMMM Do YYYY, h:mm A') : "N/A"}</Text>
        
              <Text style={styles.cardLabel}>Completed At:</Text>
              <Text style={styles.cardText}>{item.deliveryOrder?.completedAt ? moment(item.deliveryOrder.completedAt).format('MMMM Do YYYY, h:mm A') : "N/A"}</Text>
        
              <Text style={styles.cardLabel}>Customer Branch:</Text>
              <Text style={styles.cardText}>
                {item.deliveryOrder?.customerBranch?.name || "N/A"} ({item.deliveryOrder?.customerBranch?.location || "N/A"})
              </Text>
        
              <Text style={styles.cardLabel}>Driver:</Text>
              <Text style={styles.cardText}>{item.deliveryOrder?.driver?.name || "N/A"}</Text>
        
              {item.deliveryOrder?.lineItems?.length > 0 && (
                <View style={styles.lineItemContainer}>
                  <Text style={styles.lineItemTitle}>Line Items:</Text>
                  {item.deliveryOrder.lineItems.map((lineItem, index) => (
                    <View key={index} style={styles.lineItem}>
                      <Text style={styles.cardText}>Item: {lineItem.name}</Text>
                      <Text style={styles.cardText}>Quantity: {lineItem.quantity}</Text>
                      <Text style={styles.cardText}>Units: {lineItem.units}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#B7B7B7",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textTransform: "uppercase",
    flex: 1,
    marginRight: 15,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  dateButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#F8F8F8", 
    padding: 15,
    borderRadius: 12,
    marginBottom: 20, 
    borderColor: "#B0BEC5", 
    borderWidth: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  status: (status) => ({
    fontSize: 14,
    fontWeight: "bold",
    color: status === "completed" ? "#28A745" : status === "pending" ? "#FFC107" : "#007BFF",
    textTransform: "uppercase",
  }),
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginVertical: 10,
  },
  detailsContainer: {
    marginVertical: 5,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  cardText: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 5,
  },
  lineItemContainer: {
    marginTop: 10,
  },
  lineItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 5,
  },
  lineItem: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 8,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#007BFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#DC3545",
  },
});

export default OrderListScreen;
