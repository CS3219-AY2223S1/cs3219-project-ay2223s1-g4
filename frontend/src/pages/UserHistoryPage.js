import { Box, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { URL_HISTORY_ENDPT } from '../configs';


function UserHistoryPage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const {history, updateHistory} = useState([])  
  let nevigateTo = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  const loadHistory = () => {
    getAccessTokenSilently().then((token) => {
      axios.post(URL_HISTORY_ENDPT + encodeURI(user.id), {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        updateHistory(res)
      });
    })
  }

  // GET 8002/api/room/user/ + {encodeURI(user.id)}
  return isAuthenticated && (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Peer name</th>
          <th>Question title</th>
          <th>Ongoing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UserHistoryPage;
