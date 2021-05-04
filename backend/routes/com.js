import express from "express";
import * as comCtrl from "../controllers/comCtrl.js";
import  auth from "../middleware/auth.js";
import imageHandler from "../middleware/multer-config.js";

export function route() {
    const router = express.Router();
    router.post("/", auth, imageHandler, comCtrl.createCom );
    router.get("/", auth, comCtrl.getAllComs);
    return router;
}