import app from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

// console.log("work");

dotenv.config({
    path:"./.env",
});

const PORT = process.env.PORT || 8081;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`conneted with server on port:${PORT}`))
    })
    .catch((err) => console.log("error connecting server",err))

