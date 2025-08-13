const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const Card = require("../models/card.model");
const User = require("../models/user.model");
const { cardCreateSchema, cardUpdateSchema } = require("../utils/joiSchemas");

async function generateUniqueBizNumber() {
  let unique = false;
  let num;
  while (!unique) {
    num = Math.floor(1000000 + Math.random() * 9000000);
    const exists = await Card.findOne({ bizNumber: num });
    if (!exists) unique = true;
  }
  return num;
}

router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.get("/my-cards", auth, async (req, res, next) => {
  try {
    const cards = await Card.find({ user_id: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.json(card);
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, validate(cardCreateSchema), async (req, res, next) => {
  try {
    if (!req.user.isBusiness)
      return res.status(403).json({ error: "Business account required" });
    const bizNumber = await generateUniqueBizNumber();
    const card = await Card.create({
      ...req.body,
      bizNumber,
      user_id: req.user._id,
    });
    res.status(201).json(card);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, validate(cardUpdateSchema), async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    if (String(card.user_id) !== String(req.user._id))
      return res.status(403).json({ error: "Not allowed" });

    Object.assign(card, req.body);
    await card.save();
    res.json(card);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", auth, async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    const userId = req.user._id;
    const idx = card.likes.findIndex((u) => String(u) === String(userId));
    if (idx >= 0) card.likes.splice(idx, 1);
    else card.likes.push(userId);
    await card.save();
    res.json(card);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    if (!req.user.isAdmin && String(card.user_id) !== String(req.user._id))
      return res.status(403).json({ error: "Not allowed" });

    await card.deleteOne();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
