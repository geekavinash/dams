const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const appointmentModel = require("../models/appointmentModel");

const getAllPatients = async (req, res) => {
  try {
    const users = await userModel.find({ isDoctor: false, isAdmin: false });
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    console.log("mydocs", doctors);
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

const getDashboardStatsController = async (req, res) => {
  try {
    // Count total doctors from doctorModel
    const totalDoctors = await doctorModel.countDocuments({});

    // Count total patients from userModel (Users who are neither doctors nor admins)
    const totalPatients = await userModel.countDocuments({
      isDoctor: false,
      isAdmin: false,
    });

    // Count total bookings from appointments collection
    const totalBookings = await appointmentModel.countDocuments({});

    res.status(200).send({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: {
        totalDoctors,
        totalPatients,
        totalBookings,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).send({
      success: false,
      message: "Error while fetching dashboard statistics",
      error: error.message,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

const getAllAppointmentsController = async (req, res) => {
  try {
    const isAdmin = req.body?.isAdmin;
    const isDoctor = req.body?.isDoctor;
    // Fetch all appointments and populate references
    let filter = {};
    if (isDoctor) {
      filter = {
        doctorId: req.body?.userId,
      };
    } else if (!isAdmin && !isDoctor) {
      filter = {
        userId: req.body?.userId,
      };
    }
    const appointments = await appointmentModel
      .find(filter)
      .populate("userId", "name")
      .populate("doctorId", "name");

    const formattedAppointments = appointments.map((appointment) => ({
      _id: appointment._id,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      userInfo: {
        name: appointment.userInfo?.name,
        age: appointment.userInfo?.age,
        gender: appointment.userInfo?.gender,
      },
      doctorInfo: {
        name: appointment.doctorInfo?.name || appointment.doctorId?.name,
      },
    }));

    res.status(200).send({
      success: true,
      message: "Appointments fetched successfully",
      data: formattedAppointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
  getDashboardStatsController,
  getAllAppointmentsController,
  getAllPatients,
};
