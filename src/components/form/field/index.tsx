import styles from "./style.module.css";
export const Field = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.field}>{children}</div>
);
