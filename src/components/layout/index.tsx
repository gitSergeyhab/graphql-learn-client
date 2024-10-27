import styles from "./style.module.css";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.layout}>{children}</div>
);
