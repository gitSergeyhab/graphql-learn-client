import { useMutation } from "@apollo/client";
import {
  GET_WRITER,
  GET_WRITERS_ID_NAME,
  UPDATE_WRITER,
} from "../../graphql/writers";
import { WriterNameId } from "../../types/writer";

export const useUpdWriter = () =>
  useMutation(UPDATE_WRITER, {
    update(cache, { data: { updateWriter } }) {
      // 1. Сбросить кэш для GET_WRITERS
      cache.evict({ id: "ROOT_QUERY", fieldName: "writers" });

      // 2. Обновить кэш для конкретного писателя
      cache.writeQuery({
        query: GET_WRITER,
        variables: { id: updateWriter.id },
        data: {
          writer: {
            __typename: "Writer",
            ...updateWriter,
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
            writersIdName: existingWritersIdName.map((writer) => {
              if (writer.id === updateWriter.id) {
                return {
                  id: updateWriter.id,
                  firstName: updateWriter.firstName,
                  lastName: updateWriter.lastName,
                };
              }
              return writer;
            }),
          },
        });
      }
    },
  });
