import express from "express";
import MatchController from "../service/controller.js";

const router = new express.Router();

router.get("/", (req, res) => {
    res.send('Hello World from matching-service');
});

router.route("/match")
    .get(MatchController.getMatches)
    .post(MatchController.createMatchEntry);

export default router;
