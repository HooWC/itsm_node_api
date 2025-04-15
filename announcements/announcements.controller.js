const express = require('express');
const router = express.Router();
const authorize = require('../_middleware/authorize')
const announcementService = require('./announcements.service');

// routes
router.get('/', authorize(), getAll);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    announcementService.getAll()
        .then(mstock => res.json(mstock))
        .catch(next);
}

function create(req, res, next) {
    announcementService.create(req.body)
        .then(item => res.json(item))
        .catch(next);
}

function update(req, res, next) {
    announcementService.update(req.params.id, req.body)
        .then(item => res.json(item))
        .catch(next);
}

function _delete(req, res, next) {
    announcementService.delete(req.params.id)
        .then(() => res.json({ message: 'This Announcement has been deleted successfully' }))
        .catch(next);
} 