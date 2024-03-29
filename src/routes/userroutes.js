const express = require("express");

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
const { search } = require('../controllers/search');
const V_Token=require("../verification_Token/Token")

const userrouter = express.Router();

userrouter.post('/signup', signup);
userrouter.post('/signin', signin);
userrouter.post('/Userprofile',V_Token,Userprofile);
userrouter.put('/Updateprofile',V_Token, Updateprofile);
userrouter.post('/UserPost',V_Token, Userpost);
userrouter.get('/ReadPost', ReadPost);
userrouter.put('/UpdatePost',V_Token, UpdatePost);
userrouter.delete('/DeletePost',V_Token, DeletePost);
userrouter.post('/likePost/:_id',V_Token, likePost);
// userrouter.post('/commentPost/:_id',V_Token, commentPost);
// userrouter.post('/follow/:_id',V_Token, follow);

//userrouter.post('/likePost/:_id', likePost);
userrouter.post('/commentPost/:_id', commentPost);
userrouter.post('/follow/:_id', follow);
userrouter.get('/search', search);

module.exports = userrouter;