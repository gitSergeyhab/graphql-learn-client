import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../../graphql/books";

export const useAddBook = () =>
  useMutation(ADD_BOOK, {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "books" });
    },
  });
