import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faEnvelope,
  faUser,
  faCartShopping,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./NavbarComp.css";
import { Link } from "react-router-dom";

function NavbarComp() {
  return (
    <Navbar id="navbar" expand="sm" className="navbar-dark mb-4">
      <Container fluid>
        <Navbar.Toggle
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse className="justify-content-between" id="navbarToggler">
          <Nav>
            <Nav.Link className="active mt-0" as={Link} to="/">
              <FontAwesomeIcon
                icon={faHouse}
                className="pe-2 pe-sm-2"
              ></FontAwesomeIcon>
              Home
            </Nav.Link>
            <Nav.Link className="active mt-0" href="#">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className="pe-2 pe-sm-2"
              ></FontAwesomeIcon>
              About
            </Nav.Link>
            <Nav.Link className="active mt-0" href="#">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="pe-2 pe-sm-2"
              ></FontAwesomeIcon>
              Contact us
            </Nav.Link>
            <Nav.Link
              className="active d-inline-block d-sm-none mt-0"
              as={Link}
              to="/login"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="pe-2 pe-sm-0"
              ></FontAwesomeIcon>
              My Account
            </Nav.Link>
            <Nav.Link
              className="active d-inline-block d-sm-none mt-0"
              as={Link}
              to="/cart"
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="pe-2 pe-sm-0"
              ></FontAwesomeIcon>
              My cart
            </Nav.Link>
            <Nav.Link className="active d-inline-block d-sm-none mt-0" href="#">
              <FontAwesomeIcon
                icon={faHeart}
                className="pe-2 pe-sm-0"
              ></FontAwesomeIcon>
              My Wishlist
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav className="d-none d-sm-flex">
          <Nav.Link className="active mt-0" as={Link} to="/login">
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </Nav.Link>
          <Nav.Link className="active mt-0" as={Link} to="/cart">
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
          </Nav.Link>
          <Nav.Link className="active mt-0" href="#">
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
