import { FC } from "react";
import { Option } from "../../types/ui";

export interface SelectProps {
  onSelect: (value: string) => void;
  options: Option[];
}

export const Select: FC<SelectProps> = ({ onSelect, options }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onSelect(event.target.value);

  return (
    <select onChange={onChange}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
