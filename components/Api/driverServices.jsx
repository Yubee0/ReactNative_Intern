import { EDIT_ORDER_MUTATION } from './editOrderMutation'; 
import client from '../../apolloClient';

export const completeOrder = async (orderId, completedAt) => {
  try {
    const response = await client.mutate({
      mutation: EDIT_ORDER_MUTATION,
      variables: {
        orderId: orderId,
        orderInfo: {
          status: 'completed',
          completedAt: completedAt,
        },
      },
    });
    return response.data.editOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};
