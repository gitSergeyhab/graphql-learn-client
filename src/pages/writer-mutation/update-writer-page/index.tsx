import { WriterMutationFormData } from "../../../types/forms";
import { useTitle } from "../../../hooks/use-title";
import { useNavigate, useParams } from "react-router-dom";
import { WriterForm } from "../form";
import { adaptCountries } from "../../../utils/adapters";
import { useGetCountries } from "../../../hooks/graphql/use-get-countries";
import { useGetWriter } from "../../../hooks/graphql/use-get-writer";
import { useUpdWriter } from "../../../hooks/graphql/use-upd-writer";

export default function UpdateWriter() {
  useTitle("Update Writer");

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const queryWriter = useGetWriter(id);
  const queryCountries = useGetCountries();
  const [updateWriter, queryUpdWriter] = useUpdWriter();

  if (queryCountries.loading || queryWriter.loading) {
    return <h1>Loading...</h1>;
  }

  if (
    queryCountries.error ||
    !queryCountries.data ||
    !queryWriter.data ||
    queryWriter.error
  ) {
    return <h1>Error</h1>;
  }

  const sendData = async (data: WriterMutationFormData) => {
    const result = await updateWriter({
      variables: data,
    });
    navigate(`/writers/${result.data?.updateWriter.id}`);
  };

  return (
    <>
      <h1>Update Writer</h1>
      <WriterForm
        countryOptions={adaptCountries(queryCountries.data.countries)}
        defaultValues={queryWriter.data.writer}
        onSubmit={sendData}
        error={queryUpdWriter.error?.message}
        loading={queryUpdWriter.loading}
      />
    </>
  );
}
