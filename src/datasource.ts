import { AddBookMutationResponse, Author, Book } from 'types/types';

export const users = [
  {
    email: 'tlannister@got.com',
    firstName: 'Tywin',
    id: '1',
    lastName: 'Lannister',
    password: 'my-very-secured-password',
  },
  {
    email: 'lmormont@got.com',
    firstName: 'Lyanna',
    id: '2',
    lastName: 'Mormont',
    password: 'my-very-secured-password',
  },
];

// export class BooksDataSource {
//   // Our example static data set
//   books: Book[] = books;

//   getBooks(): Book[] {
//     // simulate fetching a list of books
//     return this.books;
//   }

//   // We are using a static data set for this small example, but normally
//   // this Mutation would *mutate* our underlying data using a database
//   // or a REST API.
//   async addBook(book: Book): Promise<AddBookMutationResponse> {
//     this.books.push(book);
//     console.log(this.books);

//     return {
//       code: '200',
//       success: true,
//       message: 'New book added!',
//       book: this.books[this.books.length - 1],
//     };
//   }
// }

export const books = [
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

export const authors = [
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

export const events = [
  { id: '1', date: new Date() },
  { id: '2', date: new Date() },
  { id: '3', date: new Date() },
];
