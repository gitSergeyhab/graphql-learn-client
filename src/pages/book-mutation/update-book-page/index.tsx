import { useMutation, useQuery } from "@apollo/client";
import { BookForm } from "../form";
import { GET_WRITERS_ID_NAME } from "../../../graphql/writers";
import { WriterNameId } from "../../../types/writer";
import { BookMutationFormData } from "../../../types/forms";
import { GET_BOOK, UPDATE_BOOK } from "../../../graphql/books";
import { useTitle } from "../../../hooks/use-title";
import { BookFull } from "../../../types/book";
import { useParams } from "react-router-dom";

export default function UpdateBook() {
  useTitle("Update Book");

  const { id } = useParams() as { id: string };

  const {
    data: dataWriters,
    loading: loadingWriters,
    error: errorWriters,
  } = useQuery<{ writers: WriterNameId[] }>(GET_WRITERS_ID_NAME);

  const {
    data: dataBook,
    loading: loadingBook,
    error: errorBook,
  } = useQuery<{ book: BookFull }>(GET_BOOK, {
    variables: {
      id,
    },
  });

  const [updateBook, { loading: addBookLoading, error: addBookError }] =
    useMutation(UPDATE_BOOK);

  if (loadingWriters || loadingBook) {
    return <h1>Loading...</h1>;
  }

  if (errorWriters || errorBook || !dataWriters || !dataBook) {
    return <h1>Error</h1>;
  }

  const sendData = (data: BookMutationFormData) => {
    updateBook({
      variables: {
        ...data,
        mainCharacters: data.mainCharacters.map(({ name }) => name),
      },
    });
  };

  return (
    <div>
      <h1>Update Book</h1>
      <BookForm
        authorOptions={dataWriters.writers.map(
          ({ id, firstName, lastName }) => ({
            value: id,
            label: `${firstName} ${lastName}`,
          })
        )}
        defaultValues={{
          ...dataBook.book,
          mainCharacters: dataBook.book.mainCharacters.map((character) => ({
            id: character,
            name: character,
          })),
        }}
        onSubmit={sendData}
        error={addBookError?.message}
        loading={addBookLoading}
      />
    </div>
  );
}
