import mongoose from "mongoose";
const authenticated_user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});
const auth_user = mongoose.model("authenticated_user", authenticated_user);

export default auth_user;
