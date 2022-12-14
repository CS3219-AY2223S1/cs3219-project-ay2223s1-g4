import "quill/dist/quill.snow.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Quill from "quill";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { URI_COLLAB_SVC } from "../configs";
import "./CodeBox.css";

function CodeBox({ roomId, socket }) {
  const [quill, setQuill] = useState();
  const [shouldAllowEdit, setShouldAllowEdit] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const saveDocumentIntervalsMs = 3 * 1000;

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      axios
        .get(`${URI_COLLAB_SVC}/api/session/room/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (!res.data.isOpen) {
            setShouldAllowEdit(false);
          }
          console.log(`data ${JSON.stringify(res.data)}`);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [getAccessTokenSilently, roomId]);

  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    console.log(`shouldAllowEdit ${shouldAllowEdit}`);
    socket.once("load-code", (document) => {
      quill.setText(document);
      if (shouldAllowEdit) {
        console.log("Enabling quill");
        quill.enable();
      } else {
        console.log("Disabling quill");
        quill.disable();
      }
    });
    socket.emit("get-code", roomId);
  }, [shouldAllowEdit, socket, quill, roomId]);

  useEffect(() => {
    if (socket == null || quill == null || !shouldAllowEdit) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("save-code", roomId, quill.getContents().ops[0].insert);
    }, saveDocumentIntervalsMs);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, roomId, saveDocumentIntervalsMs, shouldAllowEdit]);

  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-code", handler);
    return () => {
      socket.off("receive-code", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) {
      return;
    }
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") {
        return;
      }
      socket.emit("send-code", delta, `room-${roomId}`);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill, roomId]);

  useEffect(() => {
    const q = new Quill("#code-box", {
      modules: {
        toolbar: false,
      },
      theme: "snow",
    });
    q.root.setAttribute('spellcheck', false);
    q.disable();
    setQuill(q);
  }, []);

  return (
    <Box
      style={{
        marginTop: 10,
        marginBottom: 10,
        overflowY: "auto",
        height: 400,
      }}
    >
      <div id="code-box" className="font-link" style={{ fontSize: 16 }}></div>
    </Box>
  );
}

export default CodeBox;
