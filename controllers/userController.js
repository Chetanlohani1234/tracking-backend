const User = require("../models/userModel");
const { hashPassword } = require("../services/bcryptService");
//const comparePassword = require("../services/comparePassword");
const jwtService = require("../services/jwtService");
const reponse = require("../services/responseService");


const response = {success: false, data: null , message: ""};

module.exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        const passwordMatch = await comparePassword.comparePasswords(
          password,
          user.password
        );
        console.log(passwordMatch);
        if (passwordMatch) {
          const userToken = await jwtService.createJwt(user);
          (response.success = true),
            (response.message = "User Login Successfully"),
            (response.data = { user, aceesToken: userToken }),
            res.status(201).send(response);
        } else {
          (response.success = false), (response.message = "Invalid password");
          response.data = null;
          res.status(401).send(response);
        }
      } else {
        (response.success = false), (response.message = "User Not Found");
        response.data = null;
        res.status(404).send(response);
      }
    } catch (error) {
      console.error(error);
      (response.success = false), (response.message = "Internal Server Error");
      response.data = null;
      res.status(500).send(response);
    }
  };

module.exports.userSignUp = async (req,res) => {
    try {
        const {name, email, password, phoneNo, address} = req.body;

        const hashedPassword = await hashPassword(password);

        const userData = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            address: address,
            phoneNo: phoneNo
        })

        const savedData = await userData.save();

        response.success = true;
        response.message = "User SignUp Successfully";
        response.data = savedData;
        res.status(202).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}