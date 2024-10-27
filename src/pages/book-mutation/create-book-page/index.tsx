import { useMutation, useQuery } from "@apollo/client";
import { createBookDefaultValues } from "../const";
import { BookForm } from "../form";
import { GET_WRITERS_ID_NAME } from "../../../graphql/writers";
import { WriterNameId } from "../../../types/writer";
import { BookMutationFormData } from "../../../types/forms";
import { ADD_BOOK } from "../../../graphql/books";
import { useTitle } from "../../../hooks/use-title";

export default function CreateBook() {
  useTitle("Add Book");
  const { data, loading, error } = useQuery<{ writers: WriterNameId[] }>(
    GET_WRITERS_ID_NAME
  );

  const [addBook, { loading: addBookLoading, error: addBookError }] =
    useMutation(ADD_BOOK);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  const sendData = (data: BookMutationFormData) => {
    addBook({
      variables: {
        ...data,
        mainCharacters: data.mainCharacters.map(({ name }) => name),
      },
    });
  };
  return (
    <>
      <h1>Create Book</h1>
      <BookForm
        authorOptions={data.writers.map(({ id, firstName, lastName }) => ({
          value: id,
          label: `${firstName} ${lastName}`,
        }))}
        defaultValues={createBookDefaultValues}
        onSubmit={sendData}
        error={addBookError?.message}
        loading={addBookLoading}
      />
    </>
  );
}
