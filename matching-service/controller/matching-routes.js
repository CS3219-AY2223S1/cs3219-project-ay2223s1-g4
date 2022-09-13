import express from "express";
import { createMatchEntry, getRoomDetails, closeRoom } from "./matching-controller.js";

const router = new express.Router();

router.get("/", (req, res) => {
    console.log("/api route called");
    res.json();
});

router.route("/match/create")
    .post(createMatchEntry);

router.route("/room/:room_id")
    .get(getRoomDetails)
    .delete(closeRoom);

export default router;
