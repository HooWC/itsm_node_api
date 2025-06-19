const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const requestPhotoService = require('./request_photos.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    requestPhotoService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

function getById(req, res, next) {
    requestPhotoService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

function create(req, res, next) {
    requestPhotoService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    requestPhotoService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    requestPhotoService.delete(req.params.id)
        .then(() => res.json({ message: 'Request photo successfully deleted' }))
        .catch(next);
} 