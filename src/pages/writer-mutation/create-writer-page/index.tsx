import { useMutation, useQuery } from "@apollo/client";
import { useTitle } from "../../../hooks/use-title";
import { WriterForm } from "../form";
import { GET_COUNTRIES } from "../../../graphql/countries";
import { Country } from "../../../types/country";
import { adaptCountries } from "../../../utils/adapters";
import { ADD_WRITER } from "../../../graphql/writers";
import { WriterMutationFormData } from "../../../types/forms";

export default function CreateWriter() {
  useTitle("Create Writer");

  const {
    data: dataCountries,
    error: errorCountries,
    loading: loadingCountries,
  } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

  const [
    addWriter,
    { data: dataAddWriter, error: errorAddWriter, loading: loadingAddWriter },
  ] = useMutation(ADD_WRITER);

  if (loadingCountries) {
    return <h1>Loading...</h1>;
  }

  if (errorCountries || !dataCountries) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: WriterMutationFormData) => {
    await addWriter({ variables: data });
    console.log({ dataAddWriter });
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
