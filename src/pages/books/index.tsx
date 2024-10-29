import { useState } from "react";
import { BookList } from "../../components/book-list";
import { Select } from "../../components/select";
import { ORDER_OPTIONS } from "./const";
import { Order } from "../../types/ui";
import { useTitle } from "../../hooks/use-title";
import { useGetBooks } from "../../hooks/graphql/use-get-books";
import { useDelBook } from "../../hooks/graphql/use-del-book";

export default function Books() {
  useTitle("Books");
  const [order, setOrder] = useState<Order>("ASC");

  const queryBooks = useGetBooks({ sortBy: "year", order });
  const [deleteBook, { error: deleteError }] = useDelBook();

  const onSelect = (value: string) => setOrder(value as Order);

  if (queryBooks.loading) {
    return <h1>Loading...</h1>;
  }

  if (queryBooks.error || !queryBooks.data) {
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
      {queryBooks.data?.books.length ? (
        <BookList books={queryBooks.data?.books} onDelete={onDelete} />
      ) : (
        <p>No books =((</p>
      )}
    </>
  );
}
