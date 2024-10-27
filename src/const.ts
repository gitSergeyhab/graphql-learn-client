interface NavItem {
  name: string;
  path: string;
}

export const navItems: NavItem[] = [
  {
    name: "Writers",
    path: "/writers",
  },
  {
    name: "Books",
    path: "/books",
  },
  {
    name: "Add Writer",
    path: "/writers/create",
  },
  {
    name: "Add Book",
    path: "/books/create",
  },
];

export const TITLE = "GraphQL Books";
