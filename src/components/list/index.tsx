import styles from "./style.module.css";
export const List = ({ children }: { children: React.ReactNode }) => (
  <ul className={styles.list}>{children}</ul>
);
