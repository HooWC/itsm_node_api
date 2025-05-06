const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('../_middleware/validate-request');
const userNoTokenService = require('./userNoToken.service');

// Routes
router.post('/getbyid', getByIdNoTokenSchema, getByIdNoToken);
router.post('/forgotpassword', forgotPasswordSchema, forgotPassword);

module.exports = router;

// Validate get user request data
function getByIdNoTokenSchema(req, res, next) {
    const schema = Joi.object({
        emp_id: Joi.string().required(),
        username: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

// Get user by emp_id and username
function getByIdNoToken(req, res, next) {
    userNoTokenService.getByIdNoToken(req.body)
        .then(user => res.json(user))
        .catch(next);
}

// Validate forgot password request data
function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        emp_id: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

// Reset password
function forgotPassword(req, res, next) {
    userNoTokenService.forgotPassword(req.body)
        .then(result => res.json(result))
        .catch(next);
} 