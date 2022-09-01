import NavbarComp from "./components/Navbar/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Button, Form } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center px-4">
        <img src="/logo.png" id="logo" alt="logo" />
        <InputGroup id="search">
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-search"
          />
          <Button
            variant="outline-secondary"
            className="shadow-none"
            id="button-search"
          >
            Search
          </Button>
        </InputGroup>
      </header>
      <NavbarComp></NavbarComp>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
      <footer>
        <p>©2022 Built by Maayan Altarac</p>
      </footer>
    </div>
  );
}

export default App;
