import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../../graphql/books";
import { BookFull } from "../../types/book";

export const useGetBook = (id: string) =>
  useQuery<{ book: BookFull }>(GET_BOOK, { variables: { id } });
