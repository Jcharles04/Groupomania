import {body , validationResult} from 'express-validator';


export default  async function validateUser (req, res, next) {
 
    await body('firstname')
    .run(req);

    await body('mail')
    .isEmail()
    .run(req);

    await body('name')
    .run(req);

    await body('password')
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character")
    .not()
    .isEmpty()
    .run(req);

    await body('service')
    .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        next();
    }     
};