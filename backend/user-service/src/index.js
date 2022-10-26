import express from "express";
import cors from "cors";
import { checkJwt } from "./auth/auth.js";
import { PORT, FRONTEND_URL } from "./config/config.js";
import {
  removeUser,
  updateUserName,
  updateUserPassword,
  getUsername,
} from "./controller/controller.js";

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.delete("/delete", checkJwt, removeUser);
app.patch("/updateusername", checkJwt, updateUserName);
app.patch("/changepassword", checkJwt, updateUserPassword);
app.get("/username", checkJwt, getUsername);

app.listen(PORT, () => {
  console.log(`user-service listening on port ${PORT}`);
});
