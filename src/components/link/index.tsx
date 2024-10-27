import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";

export interface AppLinkProps extends PropsWithChildren {
  href: string;
}
export const AppLink: FC<AppLinkProps> = ({ href, children }) => (
  <Link className={style.link} to={href}>
    {children}
  </Link>
);
