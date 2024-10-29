export interface BookItem {
  id: string;
  title: string;
  year: number;
  author?: {
    firstName: string;
    lastName: string;
  };
}

export interface BookFull extends BookItem {
  mainCharacters: string[];
  genre: string;
  authorId: string;
}

export type BookNoId = Omit<BookFull, "id">;
