import express from "express";
import { getThumbnailbyId, getUsersThumbnails } from "../controllers/UserControllers.js";
import protect from "../Middlewares/auth.js";

const UserRouter = express.Router();

// Endpoints
UserRouter.get('/thumbnails', protect, getUsersThumbnails)
UserRouter.get('/thumbnail/:id', protect, getThumbnailbyId)

export default UserRouter;