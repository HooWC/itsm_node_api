const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const reqNotesService = require('./req_notes.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    reqNotesService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

function getById(req, res, next) {
    reqNotesService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

function create(req, res, next) {
    reqNotesService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    reqNotesService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    reqNotesService.delete(req.params.id)
        .then(() => res.json({ message: 'Request note has been deleted successfully' }))
        .catch(next);
} 