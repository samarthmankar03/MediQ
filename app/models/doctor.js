import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  img: {
    type: Image,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});


export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
