import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { URL_HISTORY_ENDPT } from "../configs";

function UserHistoryPage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const { history, updateHistory } = useState([]);

  const navigateTo = useNavigate();

  const loadHistory = () => {
    getAccessTokenSilently().then((token) => {
      axios
        .post(URL_HISTORY_ENDPT + encodeURI(user.id), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          updateHistory(res);
        });
    });
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) loadHistory();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const redirectToRoom = (roomid) => {
    navigateTo(`../room/${roomid}`);
  };

  // GET 8002/api/room/user/ + {encodeURI(user.id)}
  return (
    isAuthenticated && (
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
          {history.foreach((item) => {
            <tr>
              <td>{item.startDateTime}</td>
              <td>{item.peerNickname}</td>
              <td>
                <Button onClick={redirectToRoom(item.roomId)}>
                  {item.questionTitle}
                </Button>
              </td>
              <td>{item.endDatetime == null ? "Yes" : item.endDatetime}</td>
            </tr>;
          })}
        </tbody>
      </Table>
    )
  );
}

export default UserHistoryPage;
