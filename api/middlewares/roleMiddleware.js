const userModel = require("../models/userModels");

const roleMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const userId = req.body.userId;

      if (!userId) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized: User ID missing",
        });
      }

      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      // Determine user role
      let role = "user";
      if (user.isAdmin) role = "admin";
      else if (user.isDoctor) role = "doctor";

      // Check if role is allowed
      if (!allowedRoles.includes(role)) {
        return res.status(403).send({
          success: false,
          message: "Forbidden: Access denied",
        });
      }

      // Attach role to request for use in controllers if needed
      req.body.userRole = role;

      console.log("rolllle", role);
      next();
    } catch (error) {
      console.error("Role middleware error:", error);
      res.status(500).send({
        success: false,
        message: "Server error in role check",
        error: error.message,
      });
    }
  };
};

module.exports = roleMiddleware;
