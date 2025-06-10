const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const incidentPhotoService = require('./incident_photos.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    incidentPhotoService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

function getById(req, res, next) {
    incidentPhotoService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

function create(req, res, next) {
    incidentPhotoService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    incidentPhotoService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    incidentPhotoService.delete(req.params.id)
        .then(() => res.json({ message: 'Event photos successfully deleted' }))
        .catch(next);
} 