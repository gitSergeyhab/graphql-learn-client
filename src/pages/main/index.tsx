import { Link } from "react-router-dom";
import { navItems } from "../../const";

export default function Main() {
  return (
    <div>
      <h1>Writers / Books</h1>
      {navItems.map(({ name, path }) => (
        <Link key={name} to={path}>
          {name}
        </Link>
      ))}
    </div>
  );
}
