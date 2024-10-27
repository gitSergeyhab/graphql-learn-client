import { FC } from "react";
import { Link } from "react-router-dom";

export interface ContentLinkProps {
  href: string;
  title: string;
}
export const ContentLink: FC<ContentLinkProps> = ({ title, href }) => {
  return <Link to={href}>{title}</Link>;
};
