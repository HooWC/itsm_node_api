const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const sucategoryService = require('./sucategory.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    sucategoryService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

function getById(req, res, next) {
    sucategoryService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

function create(req, res, next) {
    sucategoryService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    sucategoryService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    sucategoryService.delete(req.params.id)
        .then(() => res.json({ message: 'Sucatgory already delete successfully' }))
        .catch(next);
} 