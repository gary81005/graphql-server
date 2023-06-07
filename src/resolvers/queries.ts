import { QueryResolvers } from '../types/types';
import { users, books, authors, events } from '../datasource.js';
// Use the generated `QueryResolvers` type to type check our queries!

const findAllUsers: QueryResolvers['users'] = () => {
  return users;
};
const queries = {
  Query: {
    users: findAllUsers,
    search: (parent, args) => {
      const { contains } = args;
      const searchResults = [];

      // Search in books by title
      const matchingBooks = books.filter((book) =>
        book.title.toLowerCase().includes(contains.toLowerCase()),
      );
      searchResults.push(...matchingBooks);

      // Search in authors by name
      const matchingAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(contains.toLowerCase()),
      );
      searchResults.push(...matchingAuthors);

      return searchResults;
    },
    books: () => books,
    authors: () => authors,
    events: () => events,
  },
  SearchResult: {
    __resolveType(obj, contextValue, info) {
      // Only Author has a name field
      if (obj.name) {
        return 'Author';
      }
      // Only Book has a title field
      if (obj.title) {
        return 'Book';
      }
      return null; // GraphQLError is thrown
    },
  },
};

export default queries;
