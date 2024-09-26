import { gql } from "@apollo/client"

export const GET_DRIVERS =gql`
query GetDrivers{
  getDrivers {
    drivers {
			id
			name
			email
			status
			phone
    }
    errors
  }
}
`
export const GET_CUSTOMERS = gql `
query GetCustomers {
  getCustomers {
    customers {
      id
      name
			email
			address
			zipcode
			phoneNo
    }
    errors
  }
}
`
export const GET_CUSTOMERS_BRANCH = gql `
query GetCustomerBranch($id:ID!) {
  getCustomerBranch(id:$id) {
    customerBranches {
      id
      name
      location
      customerId
    }
    errors
  }
}`

export const GET_ASSETS =gql `
query GetAssets{
  getAssets {
    assets {
      id
      assetId
      assetCategory
      assetStatus
			userId
			organizationId
    }
    errors
  }
}
`

export const FIND_PRODUCTS = gql `
query FindProducts {
  findProducts {
    products {
      name
      productStatus
      productUnit
      productCategory
      userId
      organizationId
    }
    errors
  }
}
`