import { useQuery } from "@apollo/client";
import { WriterNameId } from "../../types/writer";
import { GET_WRITERS_ID_NAME } from "../../graphql/writers";

export const useGetWritersIdNames = () =>
  useQuery<{ writers: WriterNameId[] }>(GET_WRITERS_ID_NAME);
