import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { URL_HISTORY_ENDPT } from "../configs";
import { Typography } from "@mui/material";

function UserHistoryPage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [history, setHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigateTo = useNavigate();

  const loadHistory = async () => {
    let historyy = [];
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        URL_HISTORY_ENDPT + encodeURI(user.sub),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      historyy = response.data;
      console.log(historyy);
      setHistory([...historyy]);
    } catch (e) {
      historyy = [
        {
          startDateTime: "15-06-1932",
          endDateTime: "20-20-2156",
          roomId: "0",
          questionTitle: "SUPER DUPER HARD",
          peerNickname: "Donkey Kong",
        },
        {
          startDateTime: "15-06-1932",
          endDateTime: "20-20-2156",
          roomId: "0",
          questionTitle: "SUPER DUPER EASY",
          peerNickname: "LUIGI THE LAZY",
        },
      ];
      setHistory([...historyy]);
    } finally {
      setLoaded(true)
    }
  };
  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const redirectToRoom = (roomid) => {
    navigateTo(`../room/${roomid}`);
  };

  if (history.length > 0) {
    return (
      isAuthenticated && (
        <div>
          <Typography
            variant="h3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px"
            }}
          >
            History
          </Typography>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Peer name</th>
                <th>Question title</th>
                <th>Ongoing</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.startDateTime).toUTCString()}</td>
                  <td>{item.peerNickname}</td>
                  <td>{item.questionTitle}</td>
                  <td>{item.endDateTime == null ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => redirectToRoom(item.roomId)}
                    >
                      Question link
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    );
  }

  return (
    isAuthenticated && loaded &&(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        You have yet to attempt anything! click{" "}
        <Button className="mx-2" href="/train">
          here
        </Button>{" "}
        to start!
      </div>
    )
  );
}

export default UserHistoryPage;
