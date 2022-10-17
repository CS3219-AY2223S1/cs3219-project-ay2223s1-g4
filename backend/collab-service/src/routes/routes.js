import express from 'express';
import CollabController from '../service/controller.js';

const router = new express.Router();

router.get('/', (req, res) => {
    res.send('Hello World from collab-service api');
});

router.route('/collab/:room_id')
    .get(CollabController.getSession)
    .put(CollabController.closeRoom);

export default router;
