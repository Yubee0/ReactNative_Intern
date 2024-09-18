import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { createOrderRequest } from "../redux/actions/orderActions";
import OrderForm from "../components/forms/orderForm";
import DatePickerModal from "../components/modals/datePickermodal";

class OrderScreen extends Component {
  state = {
    orderGroupInfo: {
      status: "pending",  
      startedAt: null,  
      completedAt: null,
      customerId: "",
      deliveryOrderAttributes: {
        plannedAt: new Date().toISOString(),  
        completedAt: null,
        customerBranchId: "",
        assetId: "",
        driverId: "",
        lineItemsAttributes: [{ name: "", quantity: "", units: "" }],
      },
    },
    isDatePickerVisible: false,
    selectedDateField: null,
  };

  validateForm = () => {
    const { customerId, deliveryOrderAttributes } = this.state.orderGroupInfo;
    if (!customerId || !deliveryOrderAttributes.customerBranchId) {
      alert("Please fill in all required fields (Customer ID, Customer Branch ID).");
      return false;
    }
    return true;
  };

  handleOrder = async () => {
    if (!this.validateForm()) return;

    try {
      const formattedOrderInfo = {
        ...this.state.orderGroupInfo,
        startedAt: this.state.orderGroupInfo.startedAt
          ? new Date(this.state.orderGroupInfo.startedAt).toISOString()
          : null,
        completedAt: this.state.orderGroupInfo.completedAt
          ? new Date(this.state.orderGroupInfo.completedAt).toISOString()
          : null,
        deliveryOrderAttributes: {
          ...this.state.orderGroupInfo.deliveryOrderAttributes,
          plannedAt: new Date(this.state.orderGroupInfo.deliveryOrderAttributes.plannedAt).toISOString(),
          completedAt: this.state.orderGroupInfo.deliveryOrderAttributes.completedAt
            ? new Date(this.state.orderGroupInfo.deliveryOrderAttributes.completedAt).toISOString()
            : null,
        },
      };

      console.log(formattedOrderInfo, "Formatted Order Info >>>>>>>>");
  
      this.props.createOrderRequest(formattedOrderInfo);
      alert("Order creation Success.");
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Error: " + error.message);
    }
  };

  updateOrderInfo = (field, value) => {
    this.setState((prevState) => ({
      orderGroupInfo: {
        ...prevState.orderGroupInfo,
        [field]: value,
      },
    }));
  };

  updateDeliveryOrderInfo = (field, value) => {
    this.setState((prevState) => ({
      orderGroupInfo: {
        ...prevState.orderGroupInfo,
        deliveryOrderAttributes: {
          ...prevState.orderGroupInfo.deliveryOrderAttributes,
          [field]: value,
        },
      },
    }));
  };

  addLineItem = () => {
    this.setState((prevState) => ({
      orderGroupInfo: {
        ...prevState.orderGroupInfo,
        deliveryOrderAttributes: {
          ...prevState.orderGroupInfo.deliveryOrderAttributes,
          lineItemsAttributes: [
            ...prevState.orderGroupInfo.deliveryOrderAttributes.lineItemsAttributes,
            { name: "", quantity: "", units: "" },
          ],
        },
      },
    }));
  };

  updateLineItem = (index, key, value) => {
    const updatedLineItems = [...this.state.orderGroupInfo.deliveryOrderAttributes.lineItemsAttributes];
    updatedLineItems[index][key] = key === 'quantity' ? parseFloat(value) : value;

    this.setState((prevState) => ({
      orderGroupInfo: {
        ...prevState.orderGroupInfo,
        deliveryOrderAttributes: {
          ...prevState.orderGroupInfo.deliveryOrderAttributes,
          lineItemsAttributes: updatedLineItems,
        },
      },
    }));
  };

  toggleDatePicker = (field) => {
    this.setState({ isDatePickerVisible: true, selectedDateField: field });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDateConfirm = (date) => {
    const field = this.state.selectedDateField;
    if (field) {
      const dateStr = date.toISOString();
      if (field.startsWith("deliveryOrderAttributes")) {
        const subField = field.split(".")[1];
        this.updateDeliveryOrderInfo(subField, dateStr);
      } else {
        this.updateOrderInfo(field, dateStr);
      }
    }
    this.hideDatePicker();
  };

  render() {
    return (
      <ScrollView>
        <OrderForm
          orderInfo={this.state.orderGroupInfo}
          onOrderChange={this.updateOrderInfo}
          onDeliveryOrderChange={this.updateDeliveryOrderInfo}
          onLineItemChange={this.updateLineItem}
          addLineItem={this.addLineItem}
          onDatePress={this.toggleDatePicker}
          onSubmit={this.handleOrder}
        />
        <DatePickerModal
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDateConfirm}
          onCancel={this.hideDatePicker}
        />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = {
  createOrderRequest,
};

export default connect(null, mapDispatchToProps)(OrderScreen);
