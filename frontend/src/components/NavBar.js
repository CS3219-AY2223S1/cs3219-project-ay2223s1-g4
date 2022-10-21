import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutButton from "../components/buttons/LogoutButton";
import Link from "@mui/material/Link";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { isAuthenticated } = useAuth0();
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Train",
      link: "/train",
    },
    {
      name: "Profile",
      link: "/profile",
    }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            PeerPrep
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => isAuthenticated && (
                  <Link key={item.name} href={item.link}>
                    <Button key={item.name} sx={{ color: "#fff" }}>
                      {item.name}
                    </Button>
                  </Link>
                ))}
          </Box>
          <LogoutButton></LogoutButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
