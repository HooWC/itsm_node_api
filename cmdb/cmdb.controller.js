const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const cmdbService = require('./cmdb.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function getAll(req, res, next) {
    cmdbService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

// done
function getById(req, res, next) {
    cmdbService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

// done
function create(req, res, next) {
    cmdbService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function update(req, res, next) {
    cmdbService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function _delete(req, res, next) {
    cmdbService.delete(req.params.id)
        .then(() => res.json({ message: 'This cmdb data has been deleted successfully' }))
        .catch(next);
} 