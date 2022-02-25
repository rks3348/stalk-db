// book.js
export const typeDef = `
  type Book {
    title: String
    author: Author
  }
`;

export const resolvers = {
    Book: {
        author: () => { }
    }
};