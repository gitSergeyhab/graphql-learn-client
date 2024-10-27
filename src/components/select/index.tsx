import { FC } from "react";
import { Option } from "../../types/ui";
import style from "./style.module.css";

export interface SelectProps {
  onSelect: (value: string) => void;
  options: Option[];
}

export const Select: FC<SelectProps> = ({ onSelect, options }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onSelect(event.target.value);

  return (
    <select onChange={onChange} className={style.select}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
