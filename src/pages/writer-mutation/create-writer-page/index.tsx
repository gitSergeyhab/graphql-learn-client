import { useTitle } from "../../../hooks/use-title";
import { WriterForm } from "../form";
import { adaptCountries } from "../../../utils/adapters";
import { WriterMutationFormData } from "../../../types/forms";
import { useNavigate } from "react-router-dom";
import { useGetCountries } from "../../../hooks/graphql/use-get-countries";
import { useAddWriter } from "../../../hooks/graphql/use-add-writer";

export default function CreateWriter() {
  useTitle("Create Writer");
  const navigate = useNavigate();

  const queryCountries = useGetCountries();
  const [addWriter, queryAddWriter] = useAddWriter();

  if (queryCountries.loading) {
    return <h1>Loading...</h1>;
  }

  if (queryCountries.error || !queryCountries.data) {
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
        countryOptions={adaptCountries(queryCountries.data.countries)}
        defaultValues={{}}
        onSubmit={sendData}
        error={queryAddWriter.error?.message}
        loading={queryAddWriter.loading}
      />
    </>
  );
}
