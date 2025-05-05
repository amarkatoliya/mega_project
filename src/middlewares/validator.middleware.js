import {validationResult} from "express-validator";
import {ApiError} from "../utils/api-error.js";

const validate = (req,res,next) => {
    const errors = validationResult(req);

    console.log(typeof(errors))

    if(errors.isEmpty()){
       return next()
    }

    const errorArray = [];

    errors.array().map((error)=>errorArray.push({
        [error.path] : error.message
    }));

    throw new ApiError(422 , "recieved data is not valid",errorArray)
};

export {validate};