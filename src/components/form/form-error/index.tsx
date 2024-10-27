import style from "./style.module.css";

export const FormError = ({ children }: { children: React.ReactNode }) => (
  <p className={style.formError}>{children}</p>
);
