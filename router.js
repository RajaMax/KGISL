import express from "express";
import userRouter from "./server/modules/User/User.route";

let router = [];

router.push(userRouter);

export default router;