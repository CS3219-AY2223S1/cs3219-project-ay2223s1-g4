import express from "express";
import MatchController from "../service/controller.js";
import Authenticator from '../auth/auth.js';

const router = new express.Router();

const verifyJwt = async (req, res, next) => {
    await Authenticator.checkJwt(req, res, next);
}
router.get("/", (req, res) => {
    res.send('Hello World from matching-service');
});

router.route("/match")
    .post(verifyJwt, MatchController.createMatchEntry);

export default router;
