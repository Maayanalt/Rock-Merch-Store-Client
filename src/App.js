import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faEnvelope,
  faUser,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
// import ProductDetails from "./components/ProductDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputGroup, Button, Form } from "react-bootstrap";
// import Login from "./Login/Login";
import "./App.css";

function App() {
  return (
    <div>
      <header className="d-flex justify-content-between align-items-center px-4">
        <img src="/logo.png" id="logo" alt="logo" />
        <InputGroup className="w-25">
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
      <nav id="navbar" className="navbar navbar-expand-sm navbar-dark mb-4">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon> About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Contact us
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main></main>
      <footer>
        <p>©2022 Built by Maayan Altarac</p>
      </footer>
    </div>
  );
}

export default App;
