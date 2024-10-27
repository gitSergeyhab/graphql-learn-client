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
  <div>
    {!!label && <label htmlFor={id}>{label}</label>}
    <input
      className="form__dynamic-field"
      {...registerProps}
      id={id}
      {...rest}
    />
    <p className="form__error">{error}</p>
  </div>
);
