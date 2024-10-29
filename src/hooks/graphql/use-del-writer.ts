import { useMutation } from "@apollo/client";
import { DELETE_WRITER, GET_WRITERS_ID_NAME } from "../../graphql/writers";
import { WriterNameId } from "../../types/writer";

export const useDelWriter = () =>
  useMutation(DELETE_WRITER, {
    update(cache, { data: { deleteWriter } }) {
      // 1. Сбросить кэш для GET_WRITERS
      cache.evict({ id: "ROOT_QUERY", fieldName: "writers" });

      // 2. Сбросить кэш для конкретного писателя
      cache.evict({
        id: cache.identify({ __typename: "Writer", id: deleteWriter.id }),
      });

      // 3. Обновить кэш GET_WRITERS_ID_NAME
      const existingWritersIdName = cache.readQuery<WriterNameId[]>({
        query: GET_WRITERS_ID_NAME,
      });

      if (existingWritersIdName) {
        cache.writeQuery({
          query: GET_WRITERS_ID_NAME,
          data: {
            writersIdName: existingWritersIdName.filter(
              (writer) => writer.id !== deleteWriter.id
            ),
          },
        });
      }
    },
  });
