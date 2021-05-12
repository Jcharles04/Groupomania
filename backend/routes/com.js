import express from "express";
import * as comCtrl from "../controllers/comCtrl.js";
import  auth from "../middleware/auth.js";
import imageHandler from "../middleware/multer-config.js";

export function route() {
    const router = express.Router();
    router.post("/", auth, imageHandler, comCtrl.createCom );
    router.post("/reply",  auth, imageHandler, comCtrl.replyCom );
    router.post("/del", auth, imageHandler, comCtrl.deleteCom );
    router.post("/like", auth, imageHandler, comCtrl.likeCom );
    router.get("/", auth, comCtrl.getAllComs);
    return router;
}