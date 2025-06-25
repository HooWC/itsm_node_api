const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const requestService = require('./requests.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.get('/reqid/:req_id', authorize(), getByReqId);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function getAll(req, res, next) {
    requestService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

// done
function getById(req, res, next) {
    requestService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

// done
function create(req, res, next) {
    requestService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function update(req, res, next) {
    requestService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function _delete(req, res, next) {
    requestService.delete(req.params.id)
        .then(() => res.json({ message: 'This request has been deleted successfully' }))
        .catch(next);
} 

function getByReqId(req, res, next) {
    requestService.getByReqId(req.params.req_id)
        .then(item => res.json(item))
        .catch(next);
} 