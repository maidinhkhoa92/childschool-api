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
router.post('/user/change-digit', Token, validate(user.changeDigit.Validate), user.changeDigit.handler);

// child
const child = require('./controller/child')

router.get('/child/', Token, child.list.handler);
router.get('/child/:id', Token, child.detail.handler);
router.put('/child/:id', Token, validate(child.update.Validate), child.update.handler);
router.patch('/child', Token, validate(child.updateNews.Validate), child.updateNews.handler);
router.patch('/child/:id', Token, validate(child.updateStatus.Validate), child.updateStatus.handler);
router.put('/child-person/:id', Token, validate(child.updateChildPerson.Validate), child.updateChildPerson.handler);
router.post('/search-child', Token, validate(child.search.Validate), child.search.handler);

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

router.post('/message', Token, validate(message.create.Validate), message.create.handler);
router.get('/message', Token, message.list.handler);
router.put('/message/:id', Token, validate(message.update.Validate), message.update.handler);

// menu 
const event = require('./controller/event');

router.get('/event', Token, event.list.handler);
router.get('/event/:id', Token, event.detail.handler);
router.post('/event', Token, validate(event.create.Validate), event.create.handler);
router.put('/event/:id', Token, validate(event.update.Validate), event.update.handler);
router.delete('/event/:id', Token, event.remove.handler);

// check in , check out
const checkin = require('./controller/checkin');

router.get('/class-action', Token, checkin.list.handler);
router.post('/class-action', Token, validate(checkin.create.Validate), checkin.create.handler);
router.put('/class-action/:id', Token, validate(checkin.update.Validate), checkin.update.handler);

//upload router
const upload = require('./controller/upload');
router.post('/upload', Token, upload);

const uploadMenu = require('./controller/uploadMenu');
router.post('/upload-menu', Token, uploadMenu);

const uploadVideo = require('./controller/uploadVideo');
router.post('/upload-video', Token, uploadVideo);

module.exports = router;
