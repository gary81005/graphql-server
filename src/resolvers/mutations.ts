import { Book, CreateUserInput, MutationResolvers } from '../types/types';
import { users, books } from '../datasource.js';

const createUser: MutationResolvers['registerUser'] = (parent, args) => {
  const { email, firstName, lastName, password }: CreateUserInput = args.input;

  const user = {
    email,
    firstName,
    id: `${users.length + 1}`,
    lastName,
    password,
  };

  users.push(user);

  return user;
};

const createBook = (parent, args) => {
  const { title, author } = args;
  const newBook: Book = { title, author: { name: author, books: [title] } };
  books.push(newBook);
  return {
    code: '200',
    success: true,
    message: 'New book added!',
    book: newBook,
  };
};

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations = {
  Mutation: {
    registerUser: createUser,
    addBook: createBook,
  },
};

export default mutations;
