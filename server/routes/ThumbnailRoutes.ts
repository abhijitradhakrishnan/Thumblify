import express from "express";
import { deleteThumbnail, generateThumbnail } from "../controllers/ThumbnailController.js";
import protect from "../Middlewares/auth.js";

const ThumbnailRouter = express.Router();

// Endpoints
ThumbnailRouter.post('/generate', protect, generateThumbnail)
ThumbnailRouter.delete('/delete/:id', protect, deleteThumbnail)

export default ThumbnailRouter;