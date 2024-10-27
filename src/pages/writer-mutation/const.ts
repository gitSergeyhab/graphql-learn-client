import * as Yup from "yup";
import { WriterMutationFormData } from "../../types/forms";

export const pageFormSchema: Yup.ObjectSchema<WriterMutationFormData> =
  Yup.object().shape({
    firstName: Yup.string()
      .required("required field")
      .max(64, "64 characters max"),
    lastName: Yup.string()
      .required("required field")
      .max(64, "64 characters max"),
    birthYear: Yup.number()
      .typeError("must be a number")
      .required("required field")
      .min(0, "min 0")
      .max(2024, "max 2024"),
    deathYear: Yup.number()
      .nullable()
      .transform((value, originalValue) => {
        return typeof originalValue !== "number" &&
          (!originalValue || originalValue.trim() === "")
          ? null
          : value;
      })
      .min(0, "min 0")
      .max(2024, "max 2024"),
    country: Yup.string()
      .required("required field")
      .max(64, "64 characters max"),
    city: Yup.string().max(64, "64 characters max"),
  });
