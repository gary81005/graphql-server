import { Book, CreateUserInput, MutationResolvers } from '../types/types';
import { users, books, User } from '../datasource.js';

const registerUser: MutationResolvers['registerUser'] = async (parent, args) => {
  const { email, firstName, lastName, password }: CreateUserInput = args.input;

  const user = {
    email,
    firstName,
    lastName,
    password,
  };

  const newUser = new User(user);
  await newUser.save();

  // users.push(user);

  return newUser;
};

const deleteUser: MutationResolvers['deleteUser'] = async (parent, args) => {
  const { id } = args;
  const result = await User.findByIdAndDelete(id);

  if (!result) {
    throw new Error(`Student with ID ${id} not found`);
  }
  return result;
};

const updateUser: MutationResolvers['updateUser'] = async (parent, args) => {
  const { id, input } = args;
  const { email, firstName, lastName, password }: CreateUserInput = input;

  const user = {
    email,
    firstName,
    lastName,
    password,
  };

  const result = await User.findByIdAndUpdate(id, user);

  return result;
};

// Use the generated `MutationResolvers` type to type check our mutations!
const mutations: MutationResolvers = {
  Mutation: {
    registerUser,
    deleteUser,
    updateUser,
    addBook: async (_, { title, author }, { dataSources }) => {
      return await dataSources.booksAPI.addBook({ title, author });
    },
  },
};

export default mutations;
