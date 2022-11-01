import express from 'express';
import RoomController from '../service/controller.js';
import { auth } from "express-oauth2-jwt-bearer";
import { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } from '../configs/config.js';

const router = new express.Router();
const checkJwt = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
});

router.get('/', (req, res) => {
    res.send('Hello World from room-service api');
});

router.route('/room/:room_id')
    .get(checkJwt, RoomController.getRoomDetails);

router.route('/room/user/:user_id')
    .get(checkJwt, RoomController.getRoomsByUserId);

export default router;
