import { useMutation, useQuery } from "@apollo/client";
import { WriterMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import { useParams } from "react-router-dom";
import { GET_COUNTRIES } from "../../../graphql/countries";
import { Country } from "../../../types/country";
import { GET_WRITER, UPDATE_WRITER } from "../../../graphql/writers";
import { WriterForm } from "../form";
import { adaptCountries } from "../../../utils/adapters";
import { WriterFull } from "../../../types/writer";

export default function UpdateWriter() {
  useTitle("Update Writer");

  const { id } = useParams() as { id: string };

  const {
    data: dataWriter,
    error: errorWriter,
    loading: loadingWriter,
  } = useQuery<{ writer: WriterFull }>(GET_WRITER, {
    variables: { id },
  });

  const {
    data: countriesData,
    error: countriesError,
    loading: countriesLoading,
  } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

  const [
    updateWriter,
    {
      data: dataUpdateWriter,
      error: errorUpdateWriter,
      loading: loadingUpdateWriter,
    },
  ] = useMutation(UPDATE_WRITER);

  if (countriesLoading || loadingWriter) {
    return <h1>Loading...</h1>;
  }

  if (countriesError || !countriesData || !dataWriter || errorWriter) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: WriterMutationFormData) => {
    const x = await updateWriter({
      variables: data,
    });
    console.log({ dataUpdateWriter, x });
  };

  return (
    <div>
      <h1>Update Book</h1>
      <WriterForm
        countryOptions={adaptCountries(countriesData.countries)}
        defaultValues={dataWriter.writer}
        onSubmit={sendData}
        error={errorUpdateWriter?.message}
        loading={loadingUpdateWriter}
      />
    </div>
  );
}
