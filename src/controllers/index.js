const AddService = require('./addService');
const getUser = require('./getUser');
const loginUser = require('./loginUser');
const deleteUser = require('./deleteUser');
const sendMail = require('./sendMail');
const addComment = require('./addComment');
const newUser = require('./newUser');
const modifyPwd = require('./modifyPwd');
const getServices = require('./getServices');
const modifyUser = require('./modifyUser');
const imgLink = require('./imgLink')
const getUserDet = require('./getUserDet');
const fileUpload = require('./fileUpload');
const markDone = require('./markDone')
const deleteComment = require('./deleteComment')
module.exports = {
  AddService,
  getUser,
  loginUser,
  deleteUser,
  sendMail,
  addComment,
  newUser,
  modifyPwd,
  getServices,
  modifyUser,
  imgLink,
  getUserDet,
  fileUpload,
  markDone,
  deleteComment
};
