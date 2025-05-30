const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const departmentService = require('./departments.service');

// routes
router.get('/', authorize(), getAll);
router.get('/getall', getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function getAll(req, res, next) {
    departmentService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

// done
function getById(req, res, next) {
    departmentService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

// done
function create(req, res, next) {
    departmentService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function update(req, res, next) {
    departmentService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function _delete(req, res, next) {
    departmentService.delete(req.params.id)
        .then(() => res.json({ message: 'This department has been deleted successfully' }))
        .catch(next);
} 