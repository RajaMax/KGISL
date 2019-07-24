import UserModel from "./User.model";
const fs = require('fs');
var mongoose = require('mongoose');
import settings from '../../../settings';
let config = require('./../../../config/' + settings.environment + '.config').default;

const UserService = {
  getUser: async () => {
    try {
      const users = await UserModel.find({}).sort({
        'name': 1
      });
      return users;
    } catch (error) {
      throw error;
    }
  },
  createUser: async user => {
    /////////ok//////
    try {
      var savedUser = await new UserModel(user).save();
      return savedUser
    } catch (error) {
      throw error;
    }
  },
};
export default UserService;