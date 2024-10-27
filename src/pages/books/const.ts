import { Option } from "../../types/ui";

export const ORDER_OPTIONS: Option[] = [
  {
    value: "ASC",
    label: "Old first",
  },
  {
    value: "DESC",
    label: "New first",
  },
] as const;
