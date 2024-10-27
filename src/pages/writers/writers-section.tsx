import { useMutation, useQuery } from "@apollo/client";
import { DELETE_WRITER, GET_WRITERS } from "../../graphql/writers";
import { WriterItem } from "../../types/writer";
import { FC } from "react";
import { WriterList } from "../../components/writer-list";

interface WritersSectionProps {
  country?: string;
}

export const WritersSection: FC<WritersSectionProps> = ({ country }) => {
  const { data, error, loading } = useQuery<{ writers: WriterItem[] }>(
    GET_WRITERS,
    { variables: { country } }
  );

  const [deleteWriter, { error: deleteError }] = useMutation(DELETE_WRITER, {
    refetchQueries: ["GET_WRITERS"],
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !data) {
    return <h2>Error</h2>;
  }

  if (deleteError) {
    console.error(deleteError);
  }

  const onDelete = (id: string) => {
    deleteWriter({ variables: { id } });
  };

  if (!data?.writers.length) return <h2>No Writers</h2>;

  return <WriterList writers={data?.writers} onDelete={onDelete} />;
};
