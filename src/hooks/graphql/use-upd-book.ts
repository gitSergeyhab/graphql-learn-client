import { useMutation } from "@apollo/client";
import { UPDATE_BOOK } from "../../graphql/books";

export const useUpdBook = () =>
  useMutation(UPDATE_BOOK, {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "books" });
    },
  });
