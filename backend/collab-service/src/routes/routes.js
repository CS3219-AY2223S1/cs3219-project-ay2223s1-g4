import express from 'express';
import CollabController from '../service/controller.js';
import Authenticator from '../auth/auth.js';

const router = new express.Router();

const verifyJwt = async (req, res, next) => {
    await Authenticator.checkJwt(req, res, next);
}

router.get('/', (req, res) => {
    res.send('Hello World from collab-service api');
});

router.route('/session/room/:room_id')
    .get(verifyJwt, CollabController.getSession)
    .put(verifyJwt, CollabController.closeSession);

export default router;
