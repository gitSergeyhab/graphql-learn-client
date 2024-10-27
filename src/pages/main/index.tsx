import { Link } from "react-router-dom";
import { navItems } from "../../const";
import styles from "./style.module.css";

export default function Main() {
  return (
    <>
      <h1>Writers / Books</h1>
      <div className={styles.mainLinks}>
        {navItems.map(({ name, path }) => (
          <Link key={name} to={path} className={styles.mainLink}>
            {name}
          </Link>
        ))}
      </div>
    </>
  );
}
