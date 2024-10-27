import { FC } from "react";
import { BookItem } from "../../types/book";
import { ContentLink } from "../content-link";
import { List } from "../list";

export interface BookListProps {
  books: BookItem[];
  onDelete?: (id: string) => void;
}

export const BookList: FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <List>
      {books.map(({ author, id, title, year }) => (
        <li key={id}>
          <ContentLink
            href={`/books/${id}`}
            title={`${title}, ${author?.firstName} ${author?.lastName} (${year})`}
            size="large"
          />
          {onDelete && <button onClick={() => onDelete(id)}>X</button>}
        </li>
      ))}
    </List>
  );
};
