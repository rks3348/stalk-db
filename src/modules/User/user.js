// book.js
export const typeDef = `
    type User {
        id: Int
        email: String
    }

    type Query {
        users: [User]
    }
`;

export const resolvers = {
    Query: {
        users: async (parent, args, context, info) => {
            let users = await context.db.user.findMany();
            return users;
        },
    },
};