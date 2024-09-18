import client from '../../apolloClient';
import { CREATE_ORDER_MUTATION } from './createOrderMutation';

export const createOrder = async (orderGroupInfo) => {
  // console.log({orderGroupInfo})
  try {
    const result = await client.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: { orderGroupInfo },
    });
    if (result.data.createOrder.errors.length > 0) {
      throw new Error(result.data.createOrder.errors[0].message);
    }
    return result.data.createOrder.order;
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};
