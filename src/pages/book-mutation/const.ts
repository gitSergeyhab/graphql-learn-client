import * as Yup from "yup";
import { BookMutationFormData } from "../../types/forms";

export const createBookDefaultValues: BookMutationFormData = {
  title: "",
  year: 0,
  genre: "",
  authorId: "",
  mainCharacters: [{ name: "" }],
};

export const pageFormSchema: Yup.ObjectSchema<BookMutationFormData> =
  Yup.object().shape({
    title: Yup.string().required("required field").min(2, "2 characters min"),
    year: Yup.number()
      .required("required field")
      .min(0, "min 0")
      .max(2024, "max 2024"),
    genre: Yup.string()
      .required("required field")
      .min(2, "2 characters min")
      .max(64, "64 characters max"),
    authorId: Yup.string().required("required field"),
    mainCharacters: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .required("required field")
            .max(64, "64 characters max"),
        })
      )
      .required("required field"),
  });
