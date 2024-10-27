import { FC } from "react";
import { BookItem } from "../../types/book";
import { ContentLink } from "../content-link";

export interface BookListProps {
  books: BookItem[];
  onDelete?: (id: string) => void;
}

export const BookList: FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <ul>
      {books.map(({ author, id, title, year }) => (
        <li key={id}>
          <ContentLink
            href={`/books/${id}`}
            title={`${title}, ${author?.firstName} ${author?.lastName} (${year})`}
          />
          {onDelete && <button onClick={() => onDelete(id)}>X</button>}
        </li>
      ))}
    </ul>
  );
};
