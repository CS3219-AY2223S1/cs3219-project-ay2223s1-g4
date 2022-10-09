import express from 'express';
import RoomController from '../service/controller.js';

const router = new express.Router();

router.get('/', (req, res) => {
    res.send('Hello World from room-service api');
});

router.route('/room/:room_id')
    .get(RoomController.getRoomDetails)
    .put(RoomController.closeRoom);

router.route('/room')
    .get(RoomController.getRooms);

export default router;
