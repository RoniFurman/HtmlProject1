const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema(
  {
    first: { type: String, required: true, trim: true },
    middle: { type: String, default: "", trim: true },
    last: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
    },
    alt: { type: String, default: "business card image" },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    state: { type: String, default: "not defined" },
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: Number, required: true },
    zip: { type: Number, default: 0 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: nameSchema, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: imageSchema, default: () => ({}) },
    address: { type: addressSchema, required: true },
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    bizNumber: { type: Number, unique: true, sparse: true },
    loginAttempts: { type: Number, default: 0 },
    blockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
