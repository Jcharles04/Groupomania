import express from "express";
import * as comCtrl from "../controllers/comCtrl.js";
import  auth from "../middleware/auth.js";
import  authAdmin from "../middleware/authAdmin.js";
import imageHandler from "../middleware/multer-config.js";

export function route() {
    const router = express.Router();
    router.post("/", auth, imageHandler, comCtrl.createCom );
    router.post("/reply",  auth, imageHandler, comCtrl.replyCom );
    router.post("/del", auth, imageHandler, comCtrl.deleteCom );
    router.post("/like", auth, imageHandler, comCtrl.likeCom );
    router.post("/mod",  auth, imageHandler, comCtrl.modCom);
    router.post("/checkCom",  authAdmin, imageHandler, comCtrl.checkCom);
    router.post("/delOld", authAdmin, imageHandler, comCtrl.delOldComs);
    router.post("/oldReplies", authAdmin, comCtrl.getOldReplies);
    
    router.get("/", auth, comCtrl.getAllComs);
    router.get("/moreCom/:id", auth, imageHandler, comCtrl.getMoreComs);
    router.get("/old", authAdmin, comCtrl.getOldComs);
   
    return router;
}