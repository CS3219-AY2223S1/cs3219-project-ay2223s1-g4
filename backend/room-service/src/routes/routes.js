import express from 'express';
import RoomController from '../service/controller.js';
import Authenticator from '../auth/auth.js';

const router = new express.Router();

const verifyJwt = async (req, res, next) => {
    await Authenticator.checkJwt(req, res, next);
}

router.get('/', (req, res) => {
    res.send('Hello World from room-service api');
});

router.route('/room/:room_id')
    .get(verifyJwt, RoomController.getRoomDetails);

router.route('/room/user/:user_id')
    .get(verifyJwt, RoomController.getRoomsByUserId);

export default router;
