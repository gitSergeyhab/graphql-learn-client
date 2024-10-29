import { createBookDefaultValues } from "../const";
import { BookForm } from "../form";
import { BookMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import { useNavigate } from "react-router-dom";
import { useGetWritersIdNames } from "../../../hooks/graphql/use-get-writer-id-names";
import { useAddBook } from "../../../hooks/graphql/use-add-book";
import { adaptBookToBack, adaptWriterIdName } from "../../../utils/adapters";

export default function CreateBook() {
  useTitle("Add Book");
  const { data, loading, error } = useGetWritersIdNames();
  const [addBook, queryAddBook] = useAddBook();

  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: BookMutationFormData) => {
    const result = await addBook({
      variables: adaptBookToBack(data),
    });
    navigate(`/books/${result.data?.addBook.id}`);
  };

  return (
    <>
      <h1>Create Book</h1>
      <BookForm
        authorOptions={data.writers.map(adaptWriterIdName)}
        defaultValues={createBookDefaultValues}
        onSubmit={sendData}
        error={queryAddBook.error?.message}
        loading={queryAddBook.loading}
      />
    </>
  );
}
