import {body} from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .isEmail().withMessage("your email should be in email form")
            .notEmpty().withMessage("email is required"),
        body("username")
            .trim()
            .notEmpty().withMessage("username is required")
            .isLength({min: 3}).withMessage("username shouls be atleast 3 char")    
            .isLength({max: 13}).withMessage("username shouls be atmost 13 char"),
        body("password")
            // .isStrongPassword() 
            .notEmpty().withMessage("password is required")
            .isLength({min: 6}).withMessage("password shouls be atleast 3 char")    
            .isLength({max: 9}).withMessage("password shouls be atmost 13 char"),
        body("role")
            .default("user")
    ]
}

const userLoginValidator = () => {
    return [
        body("email").isEmail().notEmpty().withMessage("email is required"),

        body("password")
        .notEmpty().withMessage("password is required")
        .isLength({min: 6}).withMessage("password shouls be atleast 3 char")    
        .isLength({max: 9}).withMessage("password shouls be atmost 13 char"),
    ]
}

export {userRegisterValidator,userLoginValidator};