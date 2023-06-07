import { Resolvers } from '../types/types';
import queries from './queries.js';
import mutations from './mutations.js';
import date from './date.js';

// Note this "Resolvers" type isn't strictly necessary because we are already
// separately type checking our queries and resolvers. However, the "Resolvers"
// generated types is useful syntax if you are defining your resolvers
// in a single file.
const resolvers: Resolvers = { ...queries, ...mutations, ...date };

export default resolvers;
