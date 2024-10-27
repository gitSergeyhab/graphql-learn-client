import { FC, PropsWithChildren } from "react";
import "./style.css";

export const JsonText: FC<PropsWithChildren> = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <div className="json-text">
      <pre>{children}</pre>
    </div>
  );
};
