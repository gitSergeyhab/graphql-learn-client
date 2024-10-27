import { useParams } from "react-router-dom";
import { FC } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/books";
import { BookItem } from "../../types/book";
import { BookList } from "../../components/bool-list";

export const BookSection: FC = () => {
  const { id } = useParams() as { id: string };
  const { data, error, loading } = useQuery<{ books: BookItem[] }>(GET_BOOKS, {
    variables: { authorId: id },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }
  return (
    <section>
      <h2>Writer`s Books</h2>
      {data?.books.length ? (
        <BookList books={data?.books} />
      ) : (
        <p>No books =((</p>
      )}
    </section>
  );
};
