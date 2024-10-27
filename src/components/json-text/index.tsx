import { FC, PropsWithChildren } from "react";
import style from "./style.module.css";

export const JsonText: FC<PropsWithChildren> = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <div className={style.jsonText}>
      <pre>{children}</pre>
    </div>
  );
};
