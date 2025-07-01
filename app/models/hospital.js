import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specialities: {
    type: [String], 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});


export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);
