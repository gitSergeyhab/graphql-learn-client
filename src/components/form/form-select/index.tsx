import { Option } from "../../../types/ui";

export interface FormSelectProps {
  options: Option[];
  registerProps: object;
  error?: string;
  id: string;
  label?: string;
}

export const FormSelect = ({
  options,
  registerProps,
  error,
  id,
  label,
}: FormSelectProps) => (
  <div>
    {!!label && <label htmlFor={id}>{label}</label>}
    <select id={id} className="form__dynamic-field" {...registerProps}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <p className="form__error">{error}</p>
  </div>
);
