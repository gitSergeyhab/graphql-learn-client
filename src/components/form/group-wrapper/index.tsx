import { PropsWithChildren } from "react";
import styles from "./style.module.css";

export const GroupWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.group}>{children}</div>
);
