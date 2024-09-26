import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CUSTOMERS, GET_CUSTOMERS_BRANCH, GET_ASSETS, FIND_PRODUCTS, GET_DRIVERS } from '../components/Api/getQuery';
import { CREATE_ORDER_MUTATION } from '../components/Api/createOrderMutation'; 
import OrderForm from '../components/forms/orderForm';
import DatePickerModal from '../components/modals/datePickermodal';

const OrderScreen = ({ navigation }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderInfo, setOrderInfo] = useState({
    customerId: '',
    status: 'pending',
    deliveryOrderAttributes: {
      customerBranchId: '',
      assetId: '',
      driverId: '',
      plannedAt: null,
      lineItemsAttributes: [
        { name: '', quantity: '', units: '' }
      ],
    },
    startedAt: null,
  });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null);

  const { data: customersData } = useQuery(GET_CUSTOMERS);
  const customers = customersData?.getCustomers.customers || [];

  const { data: branchesData, refetch: refetchBranches } = useQuery(GET_CUSTOMERS_BRANCH, {
    variables: { id: selectedCustomer },
    skip: !selectedCustomer,
  });
  const branches = branchesData?.getCustomerBranch.customerBranches || [];

  const { data: assetsData } = useQuery(GET_ASSETS);
  const assets = assetsData?.getAssets.assets || [];

  const { data: productsData } = useQuery(FIND_PRODUCTS);
  const products = productsData?.findProducts.products || [];

  const { data: driversData } = useQuery(GET_DRIVERS);
  const drivers = driversData?.getDrivers.drivers || [];

  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      Alert.alert('Success', 'Order created successfully');
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
      console.log(error);
    },
  });

  const handleOrderChange = (field, value) => {
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));

    if (field === 'customerId') {
      setSelectedCustomer(value);
      refetchBranches();
    }
  };

  const handleDeliveryOrderChange = (field, value) => {
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      deliveryOrderAttributes: {
        ...prevInfo.deliveryOrderAttributes,
        [field]: value,
      },
    }));
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...orderInfo.deliveryOrderAttributes.lineItemsAttributes];
    updatedLineItems[index] = { ...updatedLineItems[index], [field]: value };
  
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      deliveryOrderAttributes: {
        ...prevInfo.deliveryOrderAttributes,
        lineItemsAttributes: updatedLineItems,
      },
    }));
  };

  const handleDatePress = (field) => {
    setSelectedDateField(field);
    setIsDatePickerVisible(true);
  };

  const handleDateConfirm = (date) => {
    const isoDate = date.toISOString();
    if (selectedDateField === 'startedAt') {
      setOrderInfo((prevInfo) => ({ ...prevInfo, startedAt: isoDate }));
    } else if (selectedDateField === 'deliveryOrderAttributes.plannedAt') {
      setOrderInfo((prevInfo) => ({
        ...prevInfo,
        deliveryOrderAttributes: {
          ...prevInfo.deliveryOrderAttributes,
          plannedAt: isoDate,
        },
      }));
    }
    setIsDatePickerVisible(false);
  };
  const handleSubmit = () => {
    let plannedAtValue = orderInfo.deliveryOrderAttributes.plannedAt;
  
    if (!plannedAtValue) {
      plannedAtValue = new Date().toISOString(); 
    }
  
    let startedAtValue = orderInfo.startedAt;
    if (!startedAtValue) {
      startedAtValue = new Date().toISOString(); 
    }
  
    const updatedOrderInfo = {
      ...orderInfo,
      startedAt: startedAtValue,
      deliveryOrderAttributes: {
        ...orderInfo.deliveryOrderAttributes,
        plannedAt: plannedAtValue, 
      },
    };
  
    createOrder({ variables: { orderGroupInfo: updatedOrderInfo } });
    console.log(updatedOrderInfo);
  };
  
  const handleDateCancel = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <ScrollView>
      <OrderForm
        orderInfo={orderInfo}
        onOrderChange={handleOrderChange}
        onDeliveryOrderChange={handleDeliveryOrderChange}
        onLineItemChange={handleLineItemChange}
        onDatePress={handleDatePress}
        onSubmit={handleSubmit}
        customers={customers}
        branches={branches}
        assets={assets}
        products={products}
        drivers={drivers}
      />
      <DatePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </ScrollView>
  );
};

export default OrderScreen;
