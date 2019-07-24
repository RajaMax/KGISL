import express from "express";
import UserController from "./User.controller"


const UserRouter = express.Router();

//UserRouter.get('/user',  UserController.getUser);

UserRouter.post('/user', UserController.createUser);

export default UserRouter;