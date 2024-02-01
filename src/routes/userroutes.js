const express = require('express');

const { signin, signup } = require('../controllers/usercontroller');
const { Userprofile } = require('../controllers/Userprofile');
const { Updateprofile } = require('../controllers/Updateprofile');
const { Userpost } = require('../controllers/Userpost');
const { ReadPost } = require('../controllers/ReadPost');
const { UpdatePost } = require('../controllers/UpdatePost');
const { DeletePost } = require('../controllers/DeletePost');
const { likePost } = require('../controllers/likePost');
const { commentPost } = require('../controllers/commentPost');
const { follow } = require('../controllers/follow');
const { unfollow } = require('../controllers/unfollow');
const { search } = require('../controllers/search');

const userrouter = express.Router();

userrouter.post('/signup', signup);
userrouter.post('/signin', signin);
userrouter.get('/Userprofile', Userprofile);
userrouter.put('/Updateprofile', Updateprofile);
userrouter.post('/UserPost', Userpost);
userrouter.get('/ReadPost', ReadPost);
userrouter.put('/UpdatePost', UpdatePost);
userrouter.delete('/DeletePost', DeletePost);
userrouter.post('/likePost/:_id', likePost);
userrouter.post('/commentPost/:_id', commentPost);
userrouter.post('/follow/:_id', follow);
userrouter.post('/unfollow/:_id', unfollow);
userrouter.get('/search', search);

module.exports = userrouter;