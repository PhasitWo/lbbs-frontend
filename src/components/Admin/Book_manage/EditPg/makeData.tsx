export const fakeCatalogData: Catalog[] = [
  // {
  //   ID: 3890,
  //   Name: 'Doe',
  //   Author: '769 Dominic Grove',
  //   Publisher: 'Columbus',
  //   Category: 'Ohio',
  //   Description: 'A',
  //   Books: [], // Initialize the array for books
  // },
  // {
  //   ID: 3896,
  //   Name: 'Alice in wonderland',
  //   Author: '769 Dominic Grove',
  //   Publisher: 'Columbus',
  //   Category: 'Ohio',
  //   Description: 'A',
  //   Books: [], // Initialize the array for books
  // },
  // Add more catalog objects...
];

// export const fakeBookData: Book[] = [
//   {
//     docs: '1',
//     ID: '3890', // Match this ID with the Catalog ID
//   },
//   {
//     docs: '2',
//     ID: '3896', // Match this ID with the Catalog ID
//   },
//   // Add more book objects...
// ];

// Associate books with their corresponding catalogs
// fakeCatalogData.forEach((Catalog) => {
//   Catalog.Books = fakeBookData.filter((book) => book.id === book.id);
// });

export type Catalog = {
  book_id: number;
  title: string;
  genre: string;
  author: string;
  
};

export type Book = {
  book_id: number;
  docs: number[];
};
