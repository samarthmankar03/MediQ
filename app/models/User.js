import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});


export default mongoose.models.User || mongoose.model("User", userSchema);
