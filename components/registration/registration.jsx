// const resolvers = {
//   Mutation: {
//     signup: async (_, { email, password }, { dataSources }) => {
//       // Logic to create a user and return an auth token
//       const user = await dataSources.userAPI.createUser({ email, password });
//       const token = generateToken(user); // Implement token generation logic
//       return { token, user };
//     },
//     login: async (_, { email, password }, { dataSources }) => {
//       // Logic to authenticate user and return an auth token
//       const user = await dataSources.userAPI.authenticateUser({ email, password });
//       const token = generateToken(user); // Implement token generation logic
//       return { token, user };
//     },
//   },
// };
