import express from "express";
import { updateUser, deleteUser, getUser, subscribeUser, unsubscribeUser, likeVideos, dislikeVideos } from "../controllers/userController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get user
router.get("/userDetail/:id", verifyToken, getUser);

// subscribe channel
router.put("/subscribe/:id", verifyToken, subscribeUser);

// unsubscribe channel
router.put("/unsubscribe/:id", verifyToken, unsubscribeUser);

// like video
router.put("/like/:videoid", verifyToken, likeVideos);

// dislike video
router.put("/dislike/:videoid", verifyToken, dislikeVideos);

export default router;
