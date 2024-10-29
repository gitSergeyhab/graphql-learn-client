import { useQuery } from "@apollo/client";
import { GET_WRITERS } from "../../graphql/writers";
import { WriterItem } from "../../types/writer";

export const useGetWriters = (country?: string) =>
  useQuery<{ writers: WriterItem[] }>(GET_WRITERS, { variables: { country } });
