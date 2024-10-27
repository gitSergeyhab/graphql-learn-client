import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { Size } from "../../types/ui";
import cn from "classnames";

export interface ContentLinkProps {
  href: string;
  title: string;
  size?: Size;
}
export const ContentLink: FC<ContentLinkProps> = ({ title, href, size }) => {
  return (
    <Link
      className={cn(styles.contentLink, styles[`contentLink__${size}`])}
      to={href}
    >
      {title}
    </Link>
  );
};
