import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutButton from "../components/buttons/LogoutButton";
import Link from "@mui/material/Link";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/six.svg";

function NavBar() {
  const { isAuthenticated, isLoading } = useAuth0();
  // const navItems = [
  //   {
  //     name: "Home",
  //     link: "/",
  //   },
  //   {
  //     name: "Select Difficulty",
  //     link: "/selectdifficulty",
  //   },
  //   {
  //     name: "Profile",
  //     link: "/ProfilePage",
  //   }
  // ];

  // return (
  //   <Box sx={{ display: "flex" }}>
  //     <AppBar component="nav">
  //       <Toolbar>
  //         <Typography
  //           variant="h5"
  //           component="div"
  //           sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
  //         >
  //           PeerPrep
  //         </Typography>
  //         <Box sx={{ display: { xs: "none", sm: "block" } }}>
  //           {navItems.map((item) => isAuthenticated && (
  //                 <Link key={item.name} href={item.link}>
  //                   <Button key={item.name} sx={{ color: "#fff" }}>
  //                     {item.name}
  //                   </Button>
  //                 </Link>
  //               ))}
  //         </Box>
  //         <LogoutButton></LogoutButton>
  //       </Toolbar>
  //     </AppBar>
  //   </Box>
  // );
  return (
    <Navbar bg="secondary" expand="lg">
      <Container style={{ color: "white" }}>
        <Navbar.Brand style={{ color: "white" }} href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          SIX
        </Navbar.Brand>{" "}
        <Navbar.Toggle
          style={{ color: "white" }}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{ color: "white" }} href="/">
              Home
            </Nav.Link>
            <Nav.Link style={{ color: "white" }} href="/selectdifficulty">
              Train
            </Nav.Link>
            <NavDropdown
              title={<span style={{ color: "white" }}>Profile</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/ProfilePage">
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/changepasswordpage">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <LogoutButton />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
