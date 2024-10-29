import { useQuery } from "@apollo/client";
import { Order } from "../../types/ui";
import { BookItem } from "../../types/book";
import { GET_BOOKS } from "../../graphql/books";

interface RequestBooks {
  sortBy?: string;
  order?: Order;
  authorId?: number | string;
}

export const useGetBooks = (params: RequestBooks) =>
  useQuery<{ books: BookItem[] }>(GET_BOOKS, {
    variables: params,
  });
