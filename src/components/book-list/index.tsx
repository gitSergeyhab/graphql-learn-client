import { FC } from "react";
import { BookItem } from "../../types/book";
import { ContentLink } from "../content-link";
import { List } from "../list";
import { Button } from "../button";
import styles from "./style.module.css";

export interface BookListProps {
  books: BookItem[];
  onDelete?: (id: string) => void;
}

export const BookList: FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <List>
      {books.map(({ author, id, title, year }) => (
        <li key={id} className={styles.listItem}>
          <ContentLink
            href={`/books/${id}`}
            title={`${title}, ${author?.firstName} ${author?.lastName} (${year})`}
            size="large"
          />
          {onDelete && (
            <Button size="small" variant="danger" onClick={() => onDelete(id)}>
              X
            </Button>
          )}
        </li>
      ))}
    </List>
  );
};
