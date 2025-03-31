const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  getAllAppointmentsController,
  getAllPatients,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController,
);

//GET ALL APPINTMENTS
router.post("/appointments", authMiddleware, getAllAppointmentsController);

//GET METHOD || USERS
router.get("/patients", authMiddleware, getAllPatients);

module.exports = router;
