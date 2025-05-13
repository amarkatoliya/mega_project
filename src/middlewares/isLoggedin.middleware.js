import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
});

export const isLoggedIn = async  (req,res,next) => {
    try {
        let token = req.cookies.accessToken;
        console.log(token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not found so authentication failed"
            });

        }
            const decode = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            console.log("decode")
            req.user = decode;

    } catch (error) {
        console.log("Auth middleware failure");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error:error
        });
    }
    next();
}