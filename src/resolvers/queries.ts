import { QueryResolvers } from '../types/types';
import { users, books, authors, events, User } from '../datasource.js';
// Use the generated `QueryResolvers` type to type check our queries!

const findAllUsers: QueryResolvers['users'] = async (parent, { page = 1, limit = 5 }) => {
  const skip = (page - 1) * limit;
  const res = await User.find({}).skip(skip).limit(limit);
  return res;
};
const findOneUser: QueryResolvers['user'] = async (parent, args) => await User.findById(args.id);
const queries: QueryResolvers = {
  Query: {
    users: findAllUsers,
    user: findOneUser,
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
    books: async (_, __, contextValue) => {
      return await contextValue.dataSources.booksAPI.getBooks();
    },
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
