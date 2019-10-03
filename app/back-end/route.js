const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const Token = require('../helper/token');

// admin
const admin = require('./controller/admin');

router.post('/login', validate(admin.login.Validate), admin.login.handler);
router.post('/init', admin.init.handler);

// user router
const user = require('./controller/user');

router.get('/user', Token, user.list.handler);
router.get('/user/:id', Token, user.detail.handler);
router.post('/user', Token, validate(user.create.Validate), user.create.handler);
router.put('/user/:id', Token, validate(user.update.Validate), user.update.handler);
router.delete('/user/:id', Token, user.delete.handler);

// contract
const contract = require('./controller/contract');

router.get('/contact', Token, contract.list.handler);
router.delete('/contact/:id', Token, contract.remove.handler);

// event
const event = require('./controller/event');

router.get('/event', Token, event.list.handler);
router.get('/event/:id', Token, event.detail.handler);
router.post('/event', Token, validate(event.create.Validate), event.create.handler);
router.put('/event/:id', Token, validate(event.update.Validate), event.update.handler);
router.delete('/event/:id', Token, event.remove.handler);

// classes
const classes = require('./controller/classes');

router.get('/classes', Token, classes.list.handler);
router.get('/classes/:id', Token, classes.detail.handler);
router.post('/classes', Token, validate(classes.create.Validate), classes.create.handler);
router.put('/classes/:id', Token, validate(classes.update.Validate), classes.update.handler);
router.delete('/classes/:id', Token, classes.remove.handler);

// note
const note = require('./controller/note');

router.get('/note', Token, note.list.handler);
router.delete('/note/:id', Token, note.remove.handler);

module.exports = router;
