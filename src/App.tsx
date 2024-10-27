import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Writer from "./pages/writer";
import Book from "./pages/book";
import Books from "./pages/books";
import Writers from "./pages/writers";
import CreateBook from "./pages/book-mutation/create-book-page";
import UpdateBook from "./pages/book-mutation/update-book-page";
import CreateWriter from "./pages/writer-mutation/create-writer-page";
import UpdateWriter from "./pages/writer-mutation/update-writer-page";
import { Nav } from "./components/nav";
import { Layout } from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/books" element={<Books />} />
          <Route path="/writers" element={<Writers />} />
          <Route path="/writers/create" element={<CreateWriter />} />
          <Route path="/writers/:id/update" element={<UpdateWriter />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/:id/update" element={<UpdateBook />} />
          <Route path="/writers/:id" element={<Writer />} />
          <Route path="/books/:id" element={<Book />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
