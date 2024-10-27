import { useQuery } from "@apollo/client";
import { GET_WRITERS } from "../../graphql/writers";
import { WriterItem } from "../../types/writer";
import { ContentLink } from "../../components/content-link";
import { FC } from "react";
import { List } from "../../components/list";

interface WritersSectionProps {
  country?: string;
}

export const WritersSection: FC<WritersSectionProps> = ({ country }) => {
  const { data, error, loading } = useQuery<{ writers: WriterItem[] }>(
    GET_WRITERS,
    { variables: { country } }
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <List>
      {data?.writers.map(({ id, firstName, lastName, birthYear }) => (
        <li key={id}>
          <ContentLink
            href={`/writers/${id}`}
            title={`${firstName} ${lastName} (${birthYear})`}
            size="large"
          />
        </li>
      ))}
    </List>
  );
};
