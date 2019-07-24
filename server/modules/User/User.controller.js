import UserService from "./User.service";
import EmailService from "../CommonService/email.service"
import settings from '../../../settings'
let config = require('./../../../config/' + settings.environment + '.config').default;
const MEDIA = config.media;
let mkdirp = require('mkdirp');
var uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');
var pdf = require('html-pdf');
var pdfCount = 0;

const UserController = {

  createUser: async (req, res) => {
    try {
      console.log(req.body)
      console.log(JSON.parse(JSON.stringify(req.body)))
      var bodyData = JSON.parse(JSON.stringify(req.body));
      console.log(bodyData)
      console.log(typeof (bodyData.bodyData));
      var data = bodyData.bodyData ? JSON.parse(bodyData.bodyData) : req.body;
      var user = {}
      let imageUrl = "";
      console.log(req.files)
      if (req.files && req.files.image) {
        let imageFile = req.files.image;
        if (imageFile) {
          let extension = imageFile.mimetype.split("/")[1];

          let filePath = __dirname +'/image/';
          let file_name = uuidv1() + "-" + Date.now() + '.' + extension;

          imageUrl = filePath+file_name;
          console.log(filePath);
          console.log(imageUrl)
          await moveFile(imageFile, filePath, file_name)
            .catch((error) => {
              console.log(error)
              return badResponse(res, "Image Upload Failed");
            });
        }
      }
      user.name = data.name || "";
      user.role = data.role || "";
      user.email = data.email || "";
      user.phone = data.phone || "";
      user.image = imageUrl || "";
      var savedUser = await UserService.createUser(user);

       res.send({
        code: 200,
        status: "success",
        message: "New User is created",
        data: "Details are saved. "+(savedUser.email?'pdf sent to yours mail':'Email not here')
      });
      if(savedUser.email){
        EmailService.sendEmail(savedUser);
      }
      
    } catch (error) {
      console.log(error)
      res.status(400).send({
        code: 400,
        status: "error",
        message: "Error in Creating User",
        data: []
      });
    }
  },
};

let badResponse = function (res, msg) {
  res.status(400).send({
    code: 400,
    status: "error",
    message: msg,
    data: []
  });
};

let moveFile = async (media_file, filePath, file_name) => {
  return await new Promise((resolve, reject) => {
    console.log('move file')
    console.log(filePath+"00000"+file_name)
    mkdirp(filePath, function (err) {
      if (err) {
        console.log(err)
        reject({
          code: 400,
          status: "error",
          message: "Error in Uploading file",
          data: []
        });
      } else {
        media_file.mv(filePath + file_name, function (err) {
          if (err) {
            console.log(err)
            reject({
              code: 400,
              status: "error",
              message: "Error in Uploading file",
              data: []
            });
          } else {
            console.log("File Moved")
            resolve({
              code: 200,
              status: "success",
              message: "Uploaded Successfully",
              data: []
            })
          }
        });
      }
    });
  });
}



export default UserController;