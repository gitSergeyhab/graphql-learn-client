import { FC } from "react";
import { Option } from "../../types/ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pageFormSchema } from "./const";
import { FormSelect } from "../../components/form/form-select";
import { FormInput } from "../../components/form/form-input";
import { WriterMutationFormData } from "../../types/forms";
import { Button } from "../../components/button";

export interface CreateBookFormProps {
  countryOptions: Option[];
  defaultValues: WriterMutationFormData;
  loading?: boolean;
  error?: string;
  onSubmit: (data: WriterMutationFormData) => void;
}
export const WriterForm: FC<CreateBookFormProps> = ({
  countryOptions,
  defaultValues,
  onSubmit,
  loading,
  error,
}) => {
  const form = useForm<WriterMutationFormData>({
    defaultValues,
    resolver: yupResolver(pageFormSchema),
  });

  const { register, handleSubmit, formState } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="firstName"
        registerProps={register("firstName")}
        error={formState.errors.firstName?.message}
        label="firstName"
      />
      <FormInput
        id="lastName"
        registerProps={register("lastName")}
        error={formState.errors.lastName?.message}
        label="lastName"
      />
      <FormInput
        id="birthYear"
        registerProps={register("birthYear")}
        error={formState.errors.birthYear?.message}
        label="birthYear"
        type="number"
      />
      <FormInput
        id="deathYear"
        registerProps={register("deathYear")}
        error={formState.errors.deathYear?.message}
        label="deathYear"
        type="number"
      />
      <FormSelect
        options={countryOptions}
        id="country"
        registerProps={register("country")}
        error={formState.errors.country?.message}
        label="Country"
      />
      <FormInput
        id="city"
        registerProps={register("city")}
        label="City"
        error={formState.errors.city?.message}
      />
      {error ? <p>{error}</p> : null}
      <Button type="submit" fullWidth disabled={loading}>
        Submit
      </Button>
    </form>
  );
};
