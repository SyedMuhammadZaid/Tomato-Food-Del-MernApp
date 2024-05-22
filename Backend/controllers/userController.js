import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email does not exists" });
    }

    let matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    let token = createToken(user._id);
    res.json({ success: true, token, message:'Login successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// creating jwt token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password?.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, message:'Register and Login successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { loginUser, registerUser };
