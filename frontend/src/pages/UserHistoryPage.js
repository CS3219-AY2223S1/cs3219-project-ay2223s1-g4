import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "@mui/material/Link";
import Loading from "../components/loading";

function UserHistoryPage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return <div></div>;
}

export default UserHistoryPage;
