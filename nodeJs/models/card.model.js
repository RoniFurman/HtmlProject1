const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
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

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    web: { type: String, required: true },
    image: { type: imageSchema, default: () => ({}) },
    address: { type: addressSchema, required: true },
    bizNumber: { type: Number, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
