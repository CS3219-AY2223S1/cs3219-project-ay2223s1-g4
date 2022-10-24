import express from 'express';
import RoomController from '../service/controller.js';

const router = new express.Router();

router.get('/', (req, res) => {
    res.send('Hello World from room-service api');
});

router.route('/room/:room_id')
    .get(RoomController.getRoomDetails);

router.route('/room/user/:user_id')
    .get(RoomController.getRoomsByUserId);

export default router;
