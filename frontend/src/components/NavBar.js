import * as React from "react";
import LogoutButton from "../components/buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/six.svg";
import LoginButton from "../components/buttons/LoginButton";
import RegisterButton from "../components/buttons/RegisterButton";

function NavBar() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Navbar bg="secondary" expand="lg">
      <Container style={{ color: "white" }}>
        <Navbar.Brand style={{ color: "white" }} href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />{" "}
          SIX
        </Navbar.Brand>{" "}
        <Navbar.Toggle
          style={{ color: "white" }}
          aria-controls="basic-navbar-nav"
        />
        {isAuthenticated && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ color: "white" }} href="/">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "white" }} href="/train">
                Train
              </Nav.Link>
              <NavDropdown
                title={<span style={{ color: "white" }}>Profile</span>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/user-history">
                  User History
                </NavDropdown.Item>
                <NavDropdown.Item href="/change-password">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <LogoutButton />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
        {!isAuthenticated && !isLoading && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ color: "white" }} href="/">
                <LoginButton />
              </Nav.Link>
              <Nav.Link style={{ color: "white" }} href="/train">
                <RegisterButton />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
