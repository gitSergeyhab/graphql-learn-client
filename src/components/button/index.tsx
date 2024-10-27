import { FC, PropsWithChildren } from "react";

import styles from "./style.module.css";
import cn from "classnames";
import { Size } from "../../types/ui";

export interface ButtonProps extends PropsWithChildren {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: Size;
  fullwidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button: FC<ButtonProps> = ({
  children,
  size,
  variant,
  fullwidth,
  ...rest
}) => {
  const className = cn(
    styles.button,
    styles[`button__${variant}`],
    styles[`button__${size}`],
    { [styles.button__full]: fullwidth }
  );
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};
