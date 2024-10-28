import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOOK, GET_BOOKS } from "../../graphql/books";
import { BookItem } from "../../types/book";
import { BookList } from "../../components/book-list";
import { Select } from "../../components/select";
import { ORDER_OPTIONS } from "./const";
import { Order } from "../../types/ui";
import { useTitle } from "../../hooks/use-title";

export default function Books() {
  useTitle("Books");
  const [order, setOrder] = useState<Order>("ASC");
  const { data, error, loading } = useQuery<{ books: BookItem[] }>(GET_BOOKS, {
    variables: { sortBy: "year", order: order },
  });

  const [deleteBook, { error: deleteError }] = useMutation(DELETE_BOOK, {
    refetchQueries: [
      { query: GET_BOOKS, variables: { sortBy: "year", order: order } },
    ],
  });

  const onSelect = (value: string) => setOrder(value as Order);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  if (deleteError) {
    console.error(deleteError);
  }

  const onDelete = (id: string) => {
    deleteBook({ variables: { id } });
  };

  return (
    <>
      <h1>Books</h1>
      <Select onSelect={onSelect} options={ORDER_OPTIONS} />
      {data?.books.length ? (
        <BookList books={data?.books} onDelete={onDelete} />
      ) : (
        <p>No books =((</p>
      )}
    </>
  );
}
