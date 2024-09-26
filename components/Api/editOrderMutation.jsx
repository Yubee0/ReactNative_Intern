import { gql } from '@apollo/client';

export const EDIT_ORDER_MUTATION = gql`
mutation EditOrder($orderId: ID!, $orderInfo: OrderGroupInput!){
  editOrder(input: {orderId: $orderId, orderInfo: $orderInfo}){
    message
    errors
  }
}

`;