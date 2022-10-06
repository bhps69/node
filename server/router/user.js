const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/addUser',userController.form);
router.post('/addUser',userController.create);
router.get('/edituser/:id',userController.edit);
router.post('/update',userController.update);
router.get('/view-user/:id',userController.viewuser);
router.get('/:id',userController.delete);
module.exports=router 