import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "../../graphql/books";

export const useDelBook = () =>
  useMutation(DELETE_BOOK, {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "books" });
    },
  });
