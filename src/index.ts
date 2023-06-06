import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType, Kind } from 'graphql';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # type Book {
  #   title: String
  #   author: Author
  # }
  
  # type Author {
  #   name: String! # Can't return null
  #   books: [Book!]! # This list can't be null AND its list *items* can't be null
  # }
  
  scalar Date

  union SearchResult = Book | Author

  type Book {
    title: String!
  }

  type Author {
    name: String!
  }

  type Event {
    id: ID!
    date: Date!
  }

  type Query {
     books: [Book]
     authors: [Author]
     search(contains: String): [SearchResult!]
     events: [Event!]
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw new Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const books = [
  {
    title: 'The Awakening',
    author: { name: 'Kate Chopin', books: ['The Awakening'] },
  },
  {
    title: 'City of Glass',
    author: { name: 'Paul Auster', books: ['City of Glass'] },
  },
  {
    title: 'Harry Potter',
    author: {
      name: 'JK Rolin',
      books: ['Harry Potter', 'Secret Chamber', 'Death Gift'],
    },
  },
  {
    title: 'Iron Man',
    author: {
      name: 'Stan Lee',
      books: ['Avengers', 'Iron Man', 'Marvels'],
    },
  },
  {
    title: 'Star Wars',
    author: { name: 'George Lukas', books: ['Star Wars'] },
  },
];

const authors = [
  { name: 'Kate Chopin', books: ['The Awakening'] },
  { name: 'Paul Auster', books: ['City of Glass'] },
  { name: 'George Lukas', books: ['Star Wars'] },
  {
    name: 'JK Rolin',
    books: ['Harry Potter', 'Secret Chamber', 'Death Gift'],
  },
  {
    name: 'Stan Lee',
    books: ['Avengers', 'Iron Man', 'Marvels'],
  },
  {
    name: 'Conan Doll',
    books: ['Sherlock Homels', 'Jack th Reaper'],
  },
  {
    name: 'John Williams',
    books: ['Jurassic Park', 'ET', 'Water World'],
  },
];

const events = [
  { id: '1', date: new Date() },
  { id: '2', date: new Date() },
  { id: '3', date: new Date() },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
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
  Query: {
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
  Mutation: {
    addBook: (parent, args) => {
      const { title, author } = args;
      const newBook = { title, author: { name: author, books: [title] } };
      books.push(newBook);
      return newBook;
    },
  },
  Date: dateScalar,
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
