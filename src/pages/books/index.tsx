import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/books";
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

  const onSelect = (value: string) => setOrder(value as Order);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <h1>Books</h1>
      <Select onSelect={onSelect} options={ORDER_OPTIONS} />
      <BookList books={data?.books} />
    </>
  );
}
