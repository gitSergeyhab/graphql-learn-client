import { FC } from "react";
import { Option } from "../../types/ui";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pageFormSchema } from "./const";
import { FormSelect } from "../../components/form/form-select";
import { FormInput } from "../../components/form/form-input";
import { BookMutationFormData } from "../../types/forms";

export interface CreateBookFormProps {
  authorOptions: Option[];
  defaultValues: BookMutationFormData;
  loading?: boolean;
  error?: string;
  onSubmit: (data: BookMutationFormData) => void;
}
export const BookForm: FC<CreateBookFormProps> = ({
  authorOptions,
  defaultValues,
  onSubmit,
  loading,
  error,
}) => {
  const form = useForm<BookMutationFormData>({
    defaultValues,
    resolver: yupResolver(pageFormSchema),
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const {
    fields: charactersFields,
    append: appendCharacters,
    remove: removeCharacters,
  } = useFieldArray({
    name: "mainCharacters",
    control,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="title"
        registerProps={register("title")}
        error={errors.title?.message}
        placeholder="Title"
      />
      <FormInput
        id="year"
        registerProps={register("year")}
        error={errors.year?.message}
        placeholder="year"
        type="number"
      />
      <FormInput
        id="genre"
        registerProps={register("genre")}
        error={errors.genre?.message}
        placeholder="genre"
      />
      <FormSelect
        label="Author"
        options={authorOptions}
        registerProps={register("authorId")}
        id="authorId"
        error={errors.authorId?.message}
      />

      {charactersFields.map((field, index) => (
        <div key={field.id}>
          <FormInput
            id={`mainCharacters.${index}.name`}
            registerProps={register(`mainCharacters.${index}.name`)}
            error={errors.mainCharacters?.[index]?.name?.message}
            placeholder="Character Name"
          />
          {index === charactersFields.length - 1 && (
            <button
              type="button"
              onClick={() => appendCharacters({ name: "" })}
            >
              Append
            </button>
          )}
          {charactersFields.length - 1 !== 0 && (
            <button type="button" onClick={() => removeCharacters(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      {error ? <p>{error}</p> : null}
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  );
};
