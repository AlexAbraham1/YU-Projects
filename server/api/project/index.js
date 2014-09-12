'use strict';

var express = require('express');
var auth = require('../../auth/auth.service');
var controller = require('./project.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.post('/:id/comment', auth.isAuthenticated(), controller.addComment);
router.delete('/:id/comment/:commentId', auth.isAuthenticated(), controller.deleteComment);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
