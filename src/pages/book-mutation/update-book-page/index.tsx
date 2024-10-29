import { BookForm } from "../form";
import { BookMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import { useNavigate, useParams } from "react-router-dom";
import { useGetWritersIdNames } from "../../../hooks/graphql/use-get-writer-id-names";
import { useGetBook } from "../../../hooks/graphql/use-get-book";
import { useUpdBook } from "../../../hooks/graphql/use-upd-book";
import {
  adaptBookToBack,
  adaptBookToForm,
  adaptWriterIdName,
} from "../../../utils/adapters";

export default function UpdateBook() {
  useTitle("Update Book");

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const queryWriters = useGetWritersIdNames();
  const queryBook = useGetBook(id);
  const [updateBook, queryUpdBook] = useUpdBook();

  if (queryWriters.loading || queryBook.loading) {
    return <h1>Loading...</h1>;
  }

  if (
    queryWriters.error ||
    queryBook.error ||
    !queryWriters.data ||
    !queryBook.data
  ) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: BookMutationFormData) => {
    const result = await updateBook({
      variables: adaptBookToBack(data),
    });
    navigate(`/books/${result.data?.updateBook.id}`);
  };

  return (
    <>
      <h1>Update Book</h1>
      <BookForm
        authorOptions={queryWriters.data.writers.map(adaptWriterIdName)}
        defaultValues={adaptBookToForm(queryBook.data.book)}
        onSubmit={sendData}
        error={queryUpdBook.error?.message}
        loading={queryUpdBook.loading}
      />
    </>
  );
}
