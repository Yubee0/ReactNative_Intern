import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ORDERS } from '../components/Api/getOrderQuery';
import { EDIT_ORDER_MUTATION } from '../components/Api/editOrderMutation';
import { acceptOrderRequest, completeOrderRequest } from '../redux/actions/driverActions';

const DriverScreen = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const dispatch = useDispatch();
  const driverState = useSelector((state) => state.driver);
  const { loading: driverLoading, error: driverError, orders: driverOrders = [] } = driverState;

  const [editOrder] = useMutation(EDIT_ORDER_MUTATION);

  useEffect(() => {
    if (data && data.getOrders) {
      const filteredOrders = data.getOrders.orders.filter(order => {
        if (!order.startedAt) {
          return false;
        }

        const startedDate = new Date(order.startedAt).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        return startedDate === today && order.status === 'pending';
      });

      console.log("Filtered Orders: ", filteredOrders);
      dispatch({ type: 'SET_ORDERS', payload: filteredOrders });
    }
  }, [data]);

  useEffect(() => {
    console.log('Redux Driver Orders:', driverOrders);
  }, [driverOrders]);

  const handleAcceptOrder = (orderId) => {
    dispatch(acceptOrderRequest(orderId));
  };

  const handleCompleteOrder = (orderId) => {
    Alert.alert(
      'Confirm Completion',
      'Are you sure you want to mark this order as COMPLETED?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const orderToComplete = driverOrders.find(order => order.id === orderId);
            const completedAt = new Date().toISOString();
  
            if (!orderToComplete) {
              Alert.alert('Error', 'Order not found!');
              return;
            }
  
            const orderInfo = {
              status: 'completed',
              completedAt,
              customerId: orderToComplete.customer.id,
              recurring: orderToComplete.recurring,
              deliveryOrderAttributes: {
                plannedAt: orderToComplete.deliveryOrder.plannedAt,
                customerBranchId: orderToComplete.deliveryOrder.customerBranch.id,
                assetId: orderToComplete.deliveryOrder.asset.id,
                driverId: orderToComplete.deliveryOrder.driver.id,
                lineItemsAttributes: orderToComplete.deliveryOrder.lineItems.map(lineItem => ({
                  name: lineItem.name,
                  quantity: lineItem.quantity,
                  units: lineItem.units,
                })),
              },
            };
  
            editOrder({
              variables: {
                orderId: String(orderId),
                orderInfo,
              },
              onCompleted: (data) => {
                if (data.editOrder.errors.length) {
                  Alert.alert('Error', `Failed to complete the order: ${data.editOrder.errors.join(', ')}`);
                } else {
                  Alert.alert('Success', 'Order marked as completed successfully!');
                  
                  const updatedOrders = driverOrders.filter(order => order.id !== orderId);
                  dispatch({ type: 'SET_ORDERS', payload: updatedOrders });
                }
              },
              onError: (error) => {
                Alert.alert('Error', `Failed to complete the order: ${error.message}`);
                console.log('Error', `Failed to complete the order: ${error.message}`);
              },
            });
          },
        },
      ]
    );
  };
  
  
  
  if (loading || driverLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Orders...</Text>
      </View>
    );
  }

  if (error || driverError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching orders: {error?.message || driverError}</Text>
      </View>
      
    );
  }console.log(error);

  return (
    <View style={styles.container}>
      {driverOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders available for today.</Text>
      ) : (
        <FlatList
          data={driverOrders}
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
                <Text style={styles.cardText}>{item.customer?.name || 'N/A'}</Text>

                <Text style={styles.cardLabel}>Customer Branch:</Text>
                <Text style={styles.cardText}>
                  {item.deliveryOrder?.customerBranch?.name || 'N/A'} (
                  {item.deliveryOrder?.customerBranch?.location || 'N/A'})
                </Text>

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

                <TouchableOpacity
                  style={styles.button(item.status)}
                  onPress={() => {
                    if (item.status !== 'accepted') {
                      handleAcceptOrder(item.id);
                    } else {
                      handleCompleteOrder(item.id);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>
                    {item.status !== 'accepted' ? 'Accept Order' : 'Order Completed'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B7B7B7',
  },
  card: {
    backgroundColor: '#1E201E', 
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 4,
    borderColor: '#fff', 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: (status) => ({
    fontSize: 14,
    fontWeight: 'bold',
    color: status === 'completed' ? '#32CD32' : status === 'accepted' ? '#FFA500' : '#007AFF', 
    textTransform: 'uppercase',
  }),
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff', 
    marginVertical: 10,
  },
  detailsContainer: {
    marginVertical: 5,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  cardText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  lineItemContainer: {
    marginTop: 10,
  },
  lineItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 5,
  },
  lineItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    borderColor: '#fff', 
    borderWidth: 1,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFA500', 
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000', 
    marginTop: 20,
  },
  button: (status) => ({
    backgroundColor: status === 'accepted' ? '#32CD32' : '#007AFF', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  }),
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default DriverScreen;
