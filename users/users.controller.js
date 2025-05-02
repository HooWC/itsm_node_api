const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize')
const userService = require('./users.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

// done
function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        emp_id: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

// done
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

// done
function registerSchema(req, res, next) {
    const schema = Joi.object({
        emp_id: Joi.string().required(),
        prefix: Joi.string().optional(),
        photo: Joi.alternatives()
        .try(Joi.binary(), Joi.string(), Joi.allow(null))
        .optional(),
        fullname: Joi.string().required(),
        email: Joi.string().required(),
        gender: Joi.string().required(),          
        department_id: Joi.number().integer().required(),
        title: Joi.string().required(),
        business_phone: Joi.string().allow('', null).optional(),
        mobile_phone: Joi.string().required(),
        role_id: Joi.number().integer().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        race: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

// done
function register(req, res, next) {
    userService.create(req.body)
        .then(user => res.json(user))
        .catch(next);
}

// done
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

// done
function getCurrent(req, res, next) {
    res.json(req.user);
}

// done
function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

// done
function updateSchema(req, res, next) {
    const schema = Joi.object({
        emp_id: Joi.string().optional(),
        prefix: Joi.string().optional(),
        photo: Joi.alternatives()
            .try(Joi.binary(), Joi.string(), Joi.allow(null))
            .optional(),
        fullname: Joi.string().optional(),
        email: Joi.string().optional(),
        gender: Joi.string().optional(),          
        department_id: Joi.number().integer().optional(),
        title: Joi.string().optional(),
        business_phone: Joi.string().allow('', null).optional(),
        mobile_phone: Joi.string().optional(),
        role_id: Joi.number().integer().optional(),
        username: Joi.string().optional(),
        password: Joi.string().min(6).optional(),
        race: Joi.string().optional(),
    });
    validateRequest(req, next, schema);
}

// done
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

// done
function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}