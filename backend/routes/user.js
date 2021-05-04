import express from "express";
import * as userCtrl from "../controllers/usersCtrl.js";

export function route() {
    const router = express.Router();
    router.post("/signin", userCtrl.signup);
    router.post("/login", userCtrl.login);
    return router;
}