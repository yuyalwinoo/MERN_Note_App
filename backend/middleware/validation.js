const { check, validationResult } = require('express-validator');

const registerValidator = [
    check('username', 'The minimum username length is 3 characters').not().isEmpty().isLength({min: 3}),
    check('email', 'Invalid does not Empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The minimum password length is 6 characters').not().isEmpty().isLength({min: 6}),
]

const loginValidator = [
    check('email', 'Invalid does not Empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The minimum password length is 6 characters').not().isEmpty().isLength({min: 6}),
]

const noteValidator = [
    check('title', 'Invalid does not Empty').not().isEmpty(),
    check('content', 'Invalid does not Empty').not().isEmpty(),
]

const noteDeleteManyValidator = [
  check('ids')
        .exists().withMessage('IDs are required.')
        .isArray({ min: 1 }).withMessage('IDs must be an array with at least one element.'),
  check('ids.*')
        .isMongoId().withMessage('Each ID must be a valid MongoDB ObjectID.'),
]

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  };
  
module.exports = {
    handleValidation,
    registerValidator,
    loginValidator,
    noteValidator,
    noteDeleteManyValidator
};