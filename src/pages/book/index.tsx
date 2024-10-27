import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_BOOK } from "../../graphql/books";
import { JsonText } from "../../components/json-text";
import { useTitle } from "../../hooks/use-title";

export default function Book() {
  const { id } = useParams() as { id: string };
  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });
  useTitle(data?.book?.title);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <h1>{data?.book?.title}</h1>
      <JsonText>{JSON.stringify(data.book, null, 2)}</JsonText>
      <Link to={`/books/${id}/update`}>Update Book Data</Link>
    </>
  );
}
