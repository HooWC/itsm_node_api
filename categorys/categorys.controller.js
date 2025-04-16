const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const categoryService = require('./categorys.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function getAll(req, res, next) {
    categoryService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

// done
function getById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

// done
function create(req, res, next) {
    categoryService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function update(req, res, next) {
    categoryService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function _delete(req, res, next) {
    categoryService.delete(req.params.id)
        .then(() => res.json({ message: 'This category has been deleted successfully' }))
        .catch(next);
} 