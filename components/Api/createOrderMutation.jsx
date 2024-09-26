import { gql } from '@apollo/client';

export const CREATE_ORDER_MUTATION = gql`
 mutation CreateOrder($orderGroupInfo: OrderGroupInput!) {
  createOrder(input: {
    orderGroupInfo: $orderGroupInfo
  }) {
    order {
			id
      status
      startedAt
      completedAt
			parentOrderId
      customer {
				id
				name
				email
			}
      organizationId
			user {
				id
				name
				email
			}
			recurring {
				frequency
				startedAt
				endAt
			}
			deliveryOrder {
				id
				plannedAt
				completedAt
				customerBranch {
					id
					name
					location
				}
				orderGroupId
				asset{
					id
					assetId
					assetCategory
				}
				driver{
					id 
					name
					email
				}
				lineItems {
					id
					name
					quantity
					units
					deliveryOrderId
				}
			}
		}
		errors
  }
}
`;
