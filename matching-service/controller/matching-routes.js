import {
    findById,
    update,
    remove,
    findByUserId,
    index,
    create
} from "./matching-controller.js";
import express from "express";

const router = new express.Router();

router.get("/", (req, res) => {
    console.log("/api route called");
    res.json();
});

router.route("/match/:match_id")
    .get(findById)
    .put(update)
    .delete(remove);

router.route("/match/user/:user_id")
    .get(findByUserId);

router.route("/match")
    .get(index)
    .post(create);

export default router;
