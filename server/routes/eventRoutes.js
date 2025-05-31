const router = require('express').Router();
const {
    createEvent, 
    registerUser, 
    getEvents,
    getRegisteredEvents,
    getEventById,
    searchEvents,
    startEvent,
    endEvent,
} = require('../controllers/eventControllers');
const verifyToken = require('../middlewares/verifyToken');

router.post('/create-event', verifyToken, createEvent);
router.put('/register-user/:eventId', verifyToken, registerUser);
router.get('/get-events', getEvents);
router.get('/get-registered-events', verifyToken, getRegisteredEvents);
router.get('/get-event-by-id/:eventId', getEventById);
router.get('/search-events', searchEvents);
router.put('/start-event/:eventId', verifyToken, startEvent);
router.put('/end-event/:eventId', verifyToken, endEvent);

module.exports = router;