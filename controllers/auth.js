const { User } = require("../models/user");

const bcryptjs = require("bcryptjs");

const { HttpError, ctrlWrapper } = require("../helpers");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
console.log("SECRET_KEY:", SECRET_KEY);

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    
    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
};

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcryptjs.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
        token,
    })
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}