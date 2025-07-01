import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",      
    required: true,
  },
  doctorName:{
    type: String,
    required:true,
  },
  patientName:{
    type: String,
    required:true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
