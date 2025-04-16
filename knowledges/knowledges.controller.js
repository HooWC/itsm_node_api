const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const knowledgesService = require('./knowledges.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function getAll(req, res, next) {
    knowledgesService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

// done
function getById(req, res, next) {
    knowledgesService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

// done
function create(req, res, next) {
    knowledgesService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function update(req, res, next) {
    knowledgesService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function _delete(req, res, next) {
    knowledgesService.delete(req.params.id)
        .then(() => res.json({ message: 'This knowledge has been deleted successfully' }))
        .catch(next);
} 