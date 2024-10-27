import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../const";
import cn from "classnames";
import styles from "./style.module.css";

export const Nav = () => {
  const { pathname } = useLocation();

  const links = [{ name: "Home", path: "/" }, ...navItems].map(
    ({ name, path }) => (
      <Link
        key={name}
        className={cn(styles.navLink, {
          [styles.navLink__active]: pathname === path,
        })}
        to={path}
      >
        {name}
      </Link>
    )
  );
  return <nav className={styles.nav}>{links}</nav>;
};
