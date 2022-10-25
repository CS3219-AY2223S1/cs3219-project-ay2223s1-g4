import express from "express";
import cors from "cors";
import { jwtCheck } from "./auth/auth.js";
import { PORT, FRONTEND_URL } from "./config/config.js";
import {
    removeUser, 
    updateUserName,
    updateUserPassword,
    getUsername
} from "./controller/controller.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(jwtCheck);

app.delete("/delete", removeUser);
app.patch("/updateusername", updateUserName);
app.patch("/changepassword", updateUserPassword);
app.get("/username", getUsername);

app.listen(PORT, () => {
    console.log(`user-service listening on port ${PORT}`);
});
