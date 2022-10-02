import express from 'express';
import { getRoomDetails, closeRoom, getRooms } from '../service/controller.js';

const router = new express.Router();

router.get('/', (req, res) => {
    console.log('/api route called');
    res.json();
});

router.route('/room/:room_id')
    .get(getRoomDetails)
    .delete(closeRoom);

router.route('/room')
    .get(getRooms);

export default router;
