import express from "express";
import { createMatchEntry, getRoomDetails, closeRoom, getMatches, getRooms } from "./matching-controller.js";

const router = new express.Router();

router.get("/", (req, res) => {
    console.log("/api route called");
    res.json();
});

router.route("/match")
    .get(getMatches)
    .post(createMatchEntry);

router.route("/room/:room_id")
    .get(getRoomDetails)
    .delete(closeRoom);

router.route("/room")
    .get(getRooms)

export default router;
