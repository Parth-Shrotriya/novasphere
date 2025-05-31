const Event = require('../models/Event');
const ROLES = require('../lib/roles');
const User = require('../models/User');
const { search } = require('../routes/authRoutes');

const createEvent = async (req, res) => {
    if(req.role !== ROLES.admin) {
        return res.status(403).json({
            success:false, 
            message: "You are not Allowed to create an event",
            data: null
        });
    }

    const userId = req.id;
    const {title, description, date, time} = req.body;

    try{
        const event = await Event.create({
            title,
            description,
            date,
            time,
            creator: userId
        });

        return res.status(201).json({
            success: true,
            message: "Event Created Successfully",
            data: event
        });
    }catch(error) {
        return res
        .status(500)
        .json({success: false,message: error.message,data: null});
    }

};

const registerUser = async (req, res) => {
    const userId = req.id;
    const {eventId} = req.params;

    try{

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found",
                data: null
            });
        }
        const isUserRegistered = event.registeredUsers.some(
            registeredUserId => registeredUserId.toString() === userId
        );

        if(isUserRegistered) {
            return res.status(400).json({
                success: false,
                message: "User already registered for this event",
                data: null
            });
        }

        event.registeredUsers.push(userId);
        await event.save();

        const user = await User.findById(userId);
        user.registeredEvents.push(eventId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Registered Successfully",
            data: event
        });
    }catch(error) {
        return res.status(500).json({success: false,message: error.message,data: null});
    }
};

const getEvents = async (req, res) => {
    try{
        const events = await Event.find().populate({
            path: 'registeredUsers',
            select: 'firstName lastName'
        }).sort({createdAt: -1});


        return res.status(200).json({
            success: true,
            message: "Events Fetched Successfully",
            data: events
        });
    } catch(error) {
        return res.status(500).json({success: false,message: error.message,data: null});
    }
};

const getRegisteredEvents = async (req, res) => {
    const userId = req.id;
    try{

        const events = await User.findById(userId).populate("registeredEvents").sort({createdAt: -1});
        if(events.registeredEvents.length <= 0) {
            return res.status(404).json({
                success: false,
                message: "No Events Found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Events Fetched Successfully",
            data: events.registeredEvents
        });
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null});
    }
};

const getEventById = async (req, res) => {
    const {eventId} = req.params;

    try{
        const eventData = await Event.findById(eventId).populate({
            path: 'registeredUsers',
            select: 'firstName lastName role',
        })

        if(!eventData) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event Fetched Successfully",
            data: eventData
        });
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const searchEvents = async (req, res) => {
    const { search } = req.query;

    try {
        const events = await Event.find({
            $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Events Fetched Successfully",
            data: events
        });  
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
        
    }
};

const startEvent = async (req, res) => {
    if(req.role !== ROLES.admin) {
        return res.status(403).json({
            success: false, 
            message: "You are not Allowed to start an event",
            data: null
        });
    }

    const {eventId} = req.params;

    try {
        await Event.findByIdAndUpdate(eventId, { status: 'started' });
        return res.status(200).json({
            success: true,
            message: "Event Started Successfully",
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const endEvent = async (req, res) => {
    if(req.role !== ROLES.admin) {
        return res.status(403).json({
            success: false, 
            message: "You are not Allowed to end an event",
            data: null
        });
    }

    const {eventId} = req.params;

    try {
        await Event.findByIdAndUpdate(eventId, { status: 'ended' });
        return res.status(200).json({
            success: true,
            message: "Event Ended Successfully",
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
};

module.exports = {
    createEvent,
    registerUser,
    getEvents,
    getRegisteredEvents,
    getEventById,
    searchEvents,
    startEvent,
    endEvent
};