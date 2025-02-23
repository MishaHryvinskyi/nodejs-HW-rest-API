const {Schema, model} = require("mongoose");
const Joi = require("joi");
const {handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        minlength: 6,
        require: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
    token: {
        type: String,
        default: "",
    },
    avatarURL: {
        type: String,
        require: true,
    },
    verify: {
          type: Boolean,
          default: false,
    },
    verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    emailSchema,
};

const User = model("user", userSchema);

module.exports = {
    schemas,
    User,
};