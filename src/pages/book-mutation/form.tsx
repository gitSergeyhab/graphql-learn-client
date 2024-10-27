import { FC } from "react";
import { Option } from "../../types/ui";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pageFormSchema } from "./const";
import { FormSelect } from "../../components/form/form-select";
import { FormInput } from "../../components/form/form-input";
import { BookMutationFormData } from "../../types/forms";
import { Button } from "../../components/button";
import { GroupWrapper } from "../../components/form/group-wrapper";
import { FormError } from "../../components/form/form-error";

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
        label="Title"
      />
      <FormInput
        id="year"
        registerProps={register("year")}
        error={errors.year?.message}
        label="year"
        type="number"
      />
      <FormInput
        id="genre"
        registerProps={register("genre")}
        error={errors.genre?.message}
        label="genre"
      />
      <FormSelect
        label="Author"
        options={authorOptions}
        registerProps={register("authorId")}
        id="authorId"
        error={errors.authorId?.message}
      />
      {charactersFields.map((field, index) => (
        <GroupWrapper key={field.id}>
          <FormInput
            id={`mainCharacters.${index}.name`}
            registerProps={register(`mainCharacters.${index}.name`)}
            error={errors.mainCharacters?.[index]?.name?.message}
            label={`Character Name #${index + 1}`}
          />

          {charactersFields.length - 1 !== 0 ? (
            <Button
              type="button"
              size="small"
              variant="danger"
              onClick={() => removeCharacters(index)}
            >
              -
            </Button>
          ) : (
            <span />
          )}
          {index === charactersFields.length - 1 ? (
            <Button
              size="small"
              type="button"
              variant="success"
              onClick={() => appendCharacters({ name: "" })}
            >
              +
            </Button>
          ) : (
            <span />
          )}
        </GroupWrapper>
      ))}
      {error ? <FormError>{error}</FormError> : null}{" "}
      <Button type="submit" fullwidth disabled={loading}>
        Submit
      </Button>
    </form>
  );
};
