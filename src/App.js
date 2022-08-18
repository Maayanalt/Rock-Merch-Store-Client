import ProductDetails from "./components/ProductDetails/ProductDetails";
import NavbarComp from "./components/Navbar/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Button, Form } from "react-bootstrap";
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
      <main></main>
      <footer>
        <p>©2022 Built by Maayan Altarac</p>
      </footer>
    </div>
  );
}

export default App;
