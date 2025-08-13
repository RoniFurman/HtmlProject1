const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user.model");
const validate = require("../middleware/validation.middleware");
const auth = require("../middleware/auth.middleware");
const {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
  userStatusSchema,
  userBizNumberSchema,
} = require("../utils/joiSchemas");

router.post(
  "/register",
  validate(userRegisterSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing)
        return res.status(409).json({ error: "Email already registered" });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        ...req.body,
        email: email.toLowerCase(),
        password: hash,
      });

      const { password: _, ...safe } = user.toObject();
      res.status(201).json(safe);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", validate(userLoginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    const now = new Date();
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.blockedUntil && user.blockedUntil > now) {
      return res.status(423).json({
        error:
          "Account temporarily locked due to multiple failed login attempts",
        until: user.blockedUntil,
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= 3) {
        user.blockedUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24h
        user.loginAttempts = 0;
      }
      await user.save();
      return res.status(401).json({ error: "Invalid email or password" });
    }

    user.loginAttempts = 0;
    user.blockedUntil = null;
    await user.save();

    const payload = {
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ error: "Admin only" });
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    if (String(req.user._id) !== String(req.params.id) && !req.user.isAdmin)
      return res.status(403).json({ error: "Not allowed" });
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, validate(userUpdateSchema), async (req, res, next) => {
  try {
    if (String(req.user._id) !== String(req.params.id))
      return res.status(403).json({ error: "Not allowed" });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const updatableFields = ["name", "phone", "image", "address"];
    updatableFields.forEach((f) => (user[f] = req.body[f]));
    await user.save();
    const { password, ...safe } = user.toObject();
    res.json(safe);
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:id",
  auth,
  validate(userStatusSchema),
  async (req, res, next) => {
    try {
      if (String(req.user._id) !== String(req.params.id))
        return res.status(403).json({ error: "Not allowed" });
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { isBusiness: req.body.isBusiness },
        { new: true }
      ).select("-password");
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", auth, async (req, res, next) => {
  try {
    if (String(req.user._id) !== String(req.params.id) && !req.user.isAdmin)
      return res.status(403).json({ error: "Not allowed" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/bizNumber/:id",
  auth,
  validate(userBizNumberSchema),
  async (req, res, next) => {
    try {
      if (!req.user.isAdmin)
        return res.status(403).json({ error: "Admin only" });
      const exists = await User.findOne({ bizNumber: req.body.bizNumber });
      if (exists && String(exists._id) !== String(req.params.id))
        return res.status(409).json({ error: "bizNumber already in use" });
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { bizNumber: req.body.bizNumber },
        { new: true }
      ).select("-password");
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
