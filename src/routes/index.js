const express = require('express');
const router = express.Router();

const {
  AddService,
  getUser,
  loginUser,
  deleteUser,
  sendMail,
  addComment,
  getServices,
  newUser,
  modifyPwd,
  modifyUser,
  imgLink,
  getUserDet,
  fileUpload,
  markDone,
  deleteComment,
} = require('../controllers');

const {
  isUser,
  dataValidation,
  confirmMail,
  UploadAvatar,
} = require('../middleware');
const getService = require('../controllers/getService');
const addLike = require('../controllers/addLike');
const getLikesServices = require('../controllers/getLikesServices');
const getLikesComents = require('../controllers/getLikesComents');
const getColaboraciones = require('../controllers/getColaboraciones');
const getUserById = require('../controllers/getUserById');
const srcData = require('../controllers/srcData');
const bestComent = require('../controllers/bestComent');
const privadosPost = require('../controllers/privadosPost');
const privadosGet = require('../controllers/privadosGet');

router.post('/login', loginUser);
router.get('/getuser', isUser, getUser);
router.get('/getuserbyid/:id', getUserById);
router.post('/addservice', isUser, fileUpload, AddService);
router.post('/newcomment', isUser, fileUpload, addComment);
router.post('/deleteuser/:id', isUser, deleteUser);
router.post('/markdone', isUser, markDone);
router.post('/search', srcData);
router.post('/deletecomment', isUser, deleteComment);
router.get('/bestcoment/:id', isUser, bestComent);

router.post('/privados', isUser, privadosPost);
router.get('/privados/:id', isUser, privadosGet);

router.get('/mail/:mail', sendMail);
router.post('/newUser', dataValidation, newUser);
router.post('/modifyPwd', isUser, modifyPwd);
router.get('/confirm/:code', confirmMail);
router.get('/services/:order', getServices);
router.get('/service/:id', getService);
router.post('/modifyUser', isUser, UploadAvatar, modifyUser);
router.get('/img/link/:id', imgLink);
router.get('/userdet/:id', getUserDet);
router.post('/addLike', isUser, addLike);
router.get('/getlikesservices/:id', getLikesServices);
router.get('/getlikescoments/:id', getLikesComents);
router.get('/getcolaboraciones', isUser, getColaboraciones);

module.exports = router;
