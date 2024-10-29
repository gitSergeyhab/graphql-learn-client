import { useMutation } from "@apollo/client";
import {
  ADD_WRITER,
  GET_WRITER,
  GET_WRITERS_ID_NAME,
} from "../../graphql/writers";
import { WriterNameId } from "../../types/writer";

export const useAddWriter = () =>
  useMutation(ADD_WRITER, {
    update(cache, { data: { addWriter } }) {
      // 1. Сбросить кэш для GET_WRITERS
      cache.evict({ id: "ROOT_QUERY", fieldName: "writers" });

      // 2. Обновить кэш для конкретного писателя
      cache.writeQuery({
        query: GET_WRITER,
        variables: { id: addWriter.id },
        data: {
          writer: {
            __typename: "Writer",
            ...addWriter,
          },
        },
      });

      // 3. Обновить кэш GET_WRITERS_ID_NAME
      const existingWritersIdName = cache.readQuery<WriterNameId[]>({
        query: GET_WRITERS_ID_NAME,
      });

      if (existingWritersIdName) {
        cache.writeQuery({
          query: GET_WRITERS_ID_NAME,
          data: {
            writersIdName: existingWritersIdName.concat({
              id: addWriter.id,
              firstName: addWriter.firstName,
              lastName: addWriter.lastName,
            }),
          },
        });
      }
    },
  });
