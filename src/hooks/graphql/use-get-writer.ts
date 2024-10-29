import { useQuery } from "@apollo/client";
import { WriterFull } from "../../types/writer";
import { GET_WRITER } from "../../graphql/writers";

export const useGetWriter = (id: string) =>
  useQuery<{ writer: WriterFull }>(GET_WRITER, { variables: { id } });
