const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status },
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

const updateDoctorDataController = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL path
    const {
      name,
      email,
      phone,
      address,
      specialization,
      experience,
      feesPerConsultation,
    } = req.body;

    // Fields to update
    const updateFields = {
      name,
      email,
      phone,
      address,
      specialization,
      experience,
      feesPerConsultation,
    };

    // Remove undefined values from the update object
    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    // Update doctor collection
    const updatedDoctor = await doctorModel.findOneAndUpdate(
      { userId },
      updateFields,
      { new: true },
    );

    if (!updatedDoctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Update user collection
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { name, email, phone }, // Only updating these fields in the user model
      { new: true },
    );

    res.status(200).send({
      success: true,
      message: "Doctor data updated successfully",
      doctorData: updatedDoctor,
      userData: updatedUser,
    });
  } catch (error) {
    console.error("Error updating doctor data:", error);
    res.status(500).send({
      success: false,
      message: "Error updating doctor data",
      error: error.message,
    });
  }
};

const deleteDoctorController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Remove doctor by userId
    const doctor = await doctorModel.findOneAndDelete({ userId });

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Optionally delete the associated user account too
    const user = await userModel.findByIdAndDelete(userId);

    res.status(200).send({
      success: true,
      message: "Doctor and user account removed successfully",
      doctor,
      user,
    });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting doctor",
      error: error.message,
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
  updateDoctorDataController,
  deleteDoctorController,
};
