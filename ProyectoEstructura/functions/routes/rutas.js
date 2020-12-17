const express = require('express');
const router = express.Router();
const ctrlDatos = require('../controlador');

router.post('/getAdmin', ctrlDatos.getAdmin);

router.post('/addUser', ctrlDatos.addUser);

router.post('/addPost', ctrlDatos.addPost);

router.post('/addPostWithImage', ctrlDatos.addPostWithImage);

router.post('/getPosts', ctrlDatos.getPosts);

router.post('/getMyPosts', ctrlDatos.getMyPosts)

router.post('/sendMessage', ctrlDatos.sendMessage);

router.post('/getMessages', ctrlDatos.getMessages);

router.post('/deletePost', ctrlDatos.deletePost);

router.post('/editPost', ctrlDatos.editPost);

router.post('/sendMail', ctrlDatos.sendMail);

router.post('/getQuejas', ctrlDatos.getQuejas);

router.post('/deleteQuejas', ctrlDatos.deleteQuejas);

router.post('/getAllPosts', ctrlDatos.getAllPosts);
/*
router.post('/sendUbication', ctrlDatos.sendUbication);

router.post('/getUbications', ctrlDatos.getUbications);
*/

module.exports = router;