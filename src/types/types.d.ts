import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ApolloContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AddBookMutationResponse = {
  __typename?: 'AddBookMutationResponse';
  book?: Maybe<Book>;
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Author = {
  __typename?: 'Author';
  books: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  title: Scalars['String']['output'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  date: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
};

export type Library = {
  __typename?: 'Library';
  books?: Maybe<Array<Book>>;
  branch: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<AddBookMutationResponse>;
  deleteUser?: Maybe<User>;
  registerUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAddBookArgs = {
  author?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationRegisterUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  authors?: Maybe<Array<Maybe<Author>>>;
  books?: Maybe<Array<Maybe<Book>>>;
  events?: Maybe<Array<Event>>;
  libraries?: Maybe<Array<Maybe<Library>>>;
  search?: Maybe<Array<SearchResult>>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QuerySearchArgs = {
  contains?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchResult = Author | Book;

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  SearchResult: ( Author ) | ( Book );
}>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddBookMutationResponse: ResolverTypeWrapper<AddBookMutationResponse>;
  Author: ResolverTypeWrapper<Author>;
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Event: ResolverTypeWrapper<Event>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Library: ResolverTypeWrapper<Library>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SearchResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SearchResult']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddBookMutationResponse: AddBookMutationResponse;
  Author: Author;
  Book: Book;
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  Event: Event;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Library: Library;
  Mutation: {};
  Query: {};
  SearchResult: ResolversUnionTypes<ResolversParentTypes>['SearchResult'];
  String: Scalars['String']['output'];
  User: User;
}>;

export type AddBookMutationResponseResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['AddBookMutationResponse'] = ResolversParentTypes['AddBookMutationResponse']> = ResolversObject<{
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthorResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  books?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EventResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LibraryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Library'] = ResolversParentTypes['Library']> = ResolversObject<{
  books?: Resolver<Maybe<Array<ResolversTypes['Book']>>, ParentType, ContextType>;
  branch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addBook?: Resolver<Maybe<ResolversTypes['AddBookMutationResponse']>, ParentType, ContextType, Partial<MutationAddBookArgs>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationDeleteUserArgs>>;
  registerUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  authors?: Resolver<Maybe<Array<Maybe<ResolversTypes['Author']>>>, ParentType, ContextType>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType>;
  libraries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Library']>>>, ParentType, ContextType>;
  search?: Resolver<Maybe<Array<ResolversTypes['SearchResult']>>, ParentType, ContextType, Partial<QuerySearchArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserArgs>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type SearchResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Author' | 'Book', ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  AddBookMutationResponse?: AddBookMutationResponseResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  Library?: LibraryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

