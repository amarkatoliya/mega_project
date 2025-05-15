import { ApiResponse } from "../utils/api-responce.js";

const healthCheck = async (req, res) => {
  try {
    await console.log("healthcheck working");
    res
      .status(200)
      .json(
        new ApiResponse(200, { message: "server is running successfully" }),
      );
  } catch (error) {
    console.log("error in healthchecking", error);
  }
};

export { healthCheck };
