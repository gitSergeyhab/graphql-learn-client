import { FC } from "react";
import { WriterList } from "../../components/writer-list";
import { useGetWriters } from "../../hooks/graphql/use-get-writers";
import { useDelWriter } from "../../hooks/graphql/use-del-writer";

interface WritersSectionProps {
  country?: string;
}

export const WritersSection: FC<WritersSectionProps> = ({ country }) => {
  const { data, error, loading } = useGetWriters(country);

  const [deleteWriter, { error: deleteError }] = useDelWriter();

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
