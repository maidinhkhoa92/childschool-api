const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const Token = require('../helper/token');

// contact
const contact = require('./controller/contact');

router.post('/contact', validate(contact.create.Validate), contact.create.handler);

// user
const user = require('./controller/user');

router.post('/user', Token, validate(user.create.Validate), user.create.handler);
router.get('/user', Token, user.list.handler);
router.post('/login', validate(user.login.Validate), user.login.handler);
router.put('/user/:id', Token, validate(user.update.Validate), user.update.handler);
router.patch('/user/update-password', validate(user.updatePassword.Validate), user.updatePassword.handler);
router.patch('/user/update-digit', Token, validate(user.updateDigit.Validate), user.updateDigit.handler);
router.patch('/user/:id', Token, validate(user.deactive.Validate), user.deactive.handler);
router.post('/user/compare-digit', Token, validate(user.compareDigit.Validate), user.compareDigit.handler);

// child
const child = require('./controller/child')

router.get('/child/:id', Token, child.detail.handler);
router.put('/child/:id', Token, validate(child.update.Validate), child.update.handler);
router.patch('/child', Token, validate(child.updateNews.Validate), child.updateNews.handler);

// note
const note = require('./controller/note');

router.get('/note', Token, note.list.handler);
router.post('/note', Token, validate(note.create.Validate), note.create.handler);
router.put('/note/:id', Token, validate(note.update.Validate), note.update.handler);

// classes
const classes = require('./controller/classes');

router.post('/classes', Token, validate(classes.create.Validate), classes.create.handler);
router.put('/classes/:id', Token, validate(classes.addClass.Validate), classes.addClass.handler);
router.patch('/classes/:id', Token, validate(classes.updateInfor.Validate), classes.updateInfor.handler);
router.get('/classes/:id', Token, classes.detail.handler);
router.get('/classes', Token, classes.list.handler);
router.delete('/classes/:id', Token, classes.remove.handler);
router.delete('/classes/:class_id/child/:child_id', Token, classes.removeClass.handler);

// classes
const staff = require('./controller/staff');

router.get('/staff', Token, staff.list.handler);

// menu 
const menu = require('./controller/menu');

router.post('/menu', Token, validate(menu.create.Validate), menu.create.handler);
router.get('/menu', Token, menu.list.handler);

// message
const message = require('./controller/message');

router.post('/message-class', Token, validate(message.createClass.Validate), message.createClass.handler);
router.post('/message', Token, validate(message.createUser.Validate), message.createUser.handler);

//upload router
const upload = require('./controller/upload');
router.post('/upload', Token, upload);

const uploadMenu = require('./controller/uploadMenu');
router.post('/upload-menu', Token, uploadMenu);

module.exports = router;
