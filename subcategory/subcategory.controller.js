const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const subcategoryService = require('./subcategory.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    subcategoryService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

function getById(req, res, next) {
    subcategoryService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

function create(req, res, next) {
    subcategoryService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    subcategoryService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    subcategoryService.delete(req.params.id)
        .then(() => res.json({ message: 'Subcategory already delete successfully' }))
        .catch(next);
} 