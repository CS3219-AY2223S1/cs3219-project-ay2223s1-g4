import express from 'express';
import RoomController from '../service/controller.js';
import Authenticator from '../auth/auth.js';

const router = new express.Router();

router.get('/', (req, res) => {
    res.send('Hello World from room-service api');
});

const verifyJwt = async (req, res, next) => {
    await Authenticator.checkJwt(req, res, next);
}

router.route('/room/:room_id')
    .get(verifyJwt, RoomController.getRoomDetails);

router.route('/room/user/:user_id')
    .get(verifyJwt, RoomController.getRoomsByUserId);

export default router;
