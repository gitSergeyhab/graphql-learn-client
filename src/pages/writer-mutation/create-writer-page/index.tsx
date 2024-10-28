import { useMutation, useQuery } from "@apollo/client";
import { useTitle } from "../../../hooks/use-title";
import { WriterForm } from "../form";
import { GET_COUNTRIES } from "../../../graphql/countries";
import { Country } from "../../../types/country";
import { adaptCountries } from "../../../utils/adapters";
import {
  ADD_WRITER,
  GET_WRITERS,
  GET_WRITERS_ID_NAME,
} from "../../../graphql/writers";
import { WriterMutationFormData } from "../../../types/forms";
import { useNavigate } from "react-router-dom";

export default function CreateWriter() {
  useTitle("Create Writer");
  const navigate = useNavigate();

  const {
    data: dataCountries,
    error: errorCountries,
    loading: loadingCountries,
  } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

  const [addWriter, { error: errorAddWriter, loading: loadingAddWriter }] =
    useMutation(ADD_WRITER, {
      refetchQueries: [{ query: GET_WRITERS_ID_NAME }, { query: GET_WRITERS }],
    });

  if (loadingCountries) {
    return <h1>Loading...</h1>;
  }

  if (errorCountries || !dataCountries) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: WriterMutationFormData) => {
    const result = await addWriter({ variables: data });
    navigate(`/writers/${result.data?.addWriter.id}`);
  };

  return (
    <>
      <h1>Create Writer</h1>
      <WriterForm
        countryOptions={adaptCountries(dataCountries.countries)}
        defaultValues={{}}
        onSubmit={sendData}
        error={errorAddWriter?.message}
        loading={loadingAddWriter}
      />
    </>
  );
}
