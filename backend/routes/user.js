import express from "express";
import * as userCtrl from "../controllers/usersCtrl.js";
import  auth from "../middleware/auth.js";
import  authAdmin from "../middleware/authAdmin.js";
import validateUser from "../validator/user.js";
     

export function route() {
    const router = express.Router();
    router.post("/signin", validateUser, userCtrl.signup);
    router.post("/login", userCtrl.login);
    router.post("/ImLog", auth, userCtrl.ImLog);
    router.post("/del", auth, userCtrl.deleteUser);

    router.post("/ImAdmin", authAdmin, userCtrl.ImAdmin);
    router.post("/sup", authAdmin, userCtrl.modifyUser);
    router.post("/back", authAdmin, userCtrl.backUser);
    router.get("/all", authAdmin, userCtrl.getAllUsers);
    router.get("/modDate", authAdmin, userCtrl.moderationDate);
    
    return router;
}