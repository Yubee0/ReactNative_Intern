import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
 query GetOrders {
  getOrders {
    orders {
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
			user {
				id
				name
				email
			}
      organizationId
			createdAt
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
				asset {
					id 
					assetId
					assetCategory
				}
				driver {
					id
					name
					email
				}
				createdAt
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