import express from "express";
import { addVideo, updateVideo, getVideo, deleteVideo, addView, trend, random, sub, getByTag, search } from "../controllers/videoController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/addVideo", verifyToken, addVideo);

router.put("/:id", verifyToken, updateVideo);

router.delete("/:id", verifyToken, deleteVideo);

router.get("/sub", verifyToken, sub);

router.get("/find/:id", getVideo);

router.put("/view/:id", addView);

router.get("/trend", trend);

router.get("/random", random);

router.get("/tags", getByTag);

router.get("/search", search);

export default router;
