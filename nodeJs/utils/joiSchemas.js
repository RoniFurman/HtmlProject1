const Joi = require("joi");

const nameSchema = Joi.object({
  first: Joi.string().min(2).required(),
  middle: Joi.string().allow("").default(""),
  last: Joi.string().min(2).required(),
});

const imageSchema = Joi.object({
  url: Joi.string().uri().allow(""),
  alt: Joi.string().allow("").default("business card image"),
});

const addressSchema = Joi.object({
  state: Joi.string().allow("").default("not defined"),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.number().integer().required(),
  zip: Joi.alternatives(Joi.number().integer().min(0), Joi.string()).default(0),
});

const userRegisterSchema = Joi.object({
  name: nameSchema.required(),
  phone: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: imageSchema.default({}),
  address: addressSchema.required(),
  isBusiness: Joi.boolean().optional(),
});

const userUpdateSchema = Joi.object({
  name: nameSchema.required(),
  phone: Joi.string().min(6).required(),
  image: imageSchema.default({}),
  address: addressSchema.required(),
});

const userStatusSchema = Joi.object({
  isBusiness: Joi.boolean().required(),
});

const userBizNumberSchema = Joi.object({
  bizNumber: Joi.number().integer().min(1).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const cardCreateSchema = Joi.object({
  title: Joi.string().min(2).required(),
  subtitle: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  phone: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().required(),
  image: imageSchema.default({}),
  address: addressSchema.required(),
});

const cardUpdateSchema = Joi.object({
  title: Joi.string().min(2).required(),
  subtitle: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  phone: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().required(),
  image: imageSchema.default({}),
  address: addressSchema.required(),
});

module.exports = {
  userRegisterSchema,
  userUpdateSchema,
  userStatusSchema,
  userBizNumberSchema,
  userLoginSchema,
  cardCreateSchema,
  cardUpdateSchema,
};
