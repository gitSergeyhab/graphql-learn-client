import { Field } from "../field";
import { FormError } from "../form-error";
import style from "./style.module.css";

export interface FormSelectProps {
  registerProps: object;
  error?: string;
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const FormInput = ({
  registerProps,
  error,
  id,
  label,
  ...rest
}: FormSelectProps) => (
  <Field>
    {!!label && <label htmlFor={id}>{label}</label>}
    <input className={style.formInput} {...registerProps} id={id} {...rest} />
    <FormError>{error}</FormError>
  </Field>
);
