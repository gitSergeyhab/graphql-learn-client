import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { navItems } from "../../const";

export const Nav = () => {
  const { pathname } = useLocation();

  const links = [{ name: "Home", path: "/" }, ...navItems].map(
    ({ name, path }) => (
      <Link
        key={name}
        className={`nav__link ${pathname === path ? "nav__link--active" : ""}`}
        to={path}
      >
        {name}
      </Link>
    )
  );
  return <nav className="nav">{links}</nav>;
};
