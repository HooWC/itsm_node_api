const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const incidentService = require('./incidents.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.get('/incid/:inc_number', authorize(), getByIncId);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function getAll(req, res, next) {
    incidentService.getAll()
        .then(items => res.json(items))
        .catch(next);
}

// done
function getById(req, res, next) {
    incidentService.getById(req.params.id)
        .then(item => res.json(item))
        .catch(next);
}

// done
function create(req, res, next) {
    incidentService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function update(req, res, next) {
    incidentService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

// done
function _delete(req, res, next) {
    incidentService.delete(req.params.id)
        .then(() => res.json({ message: 'This incident data has been deleted successfully' }))
        .catch(next);
}

function getByIncId(req, res, next) {
    incidentService.getByIncId(req.params.inc_number)
        .then(item => res.json(item))
        .catch(next);
} 