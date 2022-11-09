import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Countdown from "react-countdown";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { URI_MATCHING_SVC } from "../configs";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import "./LoadingPage.css";

function LoadingPage() {
  const { loadingId: matchid } = useParams();
  const { isAuthenticated, isLoading } = useAuth0();

  const renderer = ({ hours, minutes, seconds, completed }) => {
    // Render a countdown
    return <span>{seconds}</span>;
  };
  const quotes = [
    { quote: "“If you can DREAM it, you can DO it.” – Walt Disney" },
    {
      quote:
        "“Choose a job you love, and you will never have to work a day in your life.” – Confucius",
    },
    {
      quote:
        "“Close your eyes. Focus on making yourself feel excited, powerful. Imagine yourself destroying goals with ease.” – Andrew Tate",
    },
  ];

  function getRandomQuote(arr) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item.quote;
  }

  const quote = getRandomQuote(quotes);

  let navigateTo = useNavigate();

  useEffect(() => {
    const socket = io(URI_MATCHING_SVC);
    socket.on("connect", () => {
      console.log(`Connected with id ${socket.id}`);
    });
    socket.emit("join-room", `match-${matchid}`);

    const timeoutId = setTimeout(() => {
      console.log("Matching failed");
      alert("No peer found for matching! Please try again another time");
      socket.disconnect(true);
      console.log(socket);
      navigateTo("../selectdifficulty");
    }, (30 + 1) * 1000);

    socket.on("provide-room", (roomid) => {
      console.log(`server provided room ${roomid}`);
      socket.disconnect(true);
      console.log(socket);
      clearTimeout(timeoutId);
      navigateTo(`../room/${roomid}`);
      return;
    });
  }, [matchid, navigateTo]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box>
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="roboto">
          Finding a peer for you. Hold on for...
          <Countdown
            date={Date.now() + 30 * 1000}
            renderer={renderer}
          ></Countdown>
          ... seconds
        </div>
      </Typography>

      <Loading />
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <div className="cursive-quote" style={{ fontSize: 40 }}>
          {quote}
        </div>
      </Typography>
    </Box>
  );
}

export default LoadingPage;
