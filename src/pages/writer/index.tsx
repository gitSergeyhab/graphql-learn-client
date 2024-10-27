import { useParams } from "react-router-dom";
import { GET_WRITER } from "../../graphql/writers";
import { useQuery } from "@apollo/client";
import { WriterFull } from "../../types/writer";
import { BookSection } from "./book-section";
import { useTitle } from "../../hooks/use-title";
import { JsonText } from "../../components/json-text";
import { AppLink } from "../../components/link";

export default function Writer() {
  const { id } = useParams() as { id: string };
  const { data, error, loading } = useQuery<{ writer: WriterFull }>(
    GET_WRITER,
    { variables: { id } }
  );

  const title = data?.writer
    ? `${data?.writer.firstName} ${data?.writer.lastName}`
    : "";

  useTitle(title);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || !data) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <h1>{title}</h1>
      <JsonText>{JSON.stringify(data.writer, null, 2)}</JsonText>
      <AppLink href={`/writers/${id}/update`}>Update Writer Data</AppLink>
      <BookSection />
    </>
  );
}
