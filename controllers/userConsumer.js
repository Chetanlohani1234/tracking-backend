const AllUser = require("../models/userConsumer");
const reponse = require("../services/responseService");

const response = {success: false, data: null , message: ""};

module.exports.allUser = async (req,res) => {
    try {
        const {name, email, phoneNo, address} = req.body;

        const allUserData = await AllUser.create({
            name: name,
            email: email,
            address: address,
            phoneNo: phoneNo
        })

        const savedData = await allUserData.save();

        response.success = true;
        response.message = "User Add Successfully";
        response.data = savedData;
        res.status(202).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.getAllUsers = async (req,res) => {
    try{
         const allUsers = await AllUser.find();

         response.success = true;
         response.message = "user retrieved successfully"
         response.data = allUsers;
         res.status(200).json(response);
    }catch (error) {
            response.success = false;
            response.message = "Internal Server Error";
            response.data = null;
            res.status(500).json(response);
        } 
    }

module.exports.deleteUser = async (req, res) => {
        try {
            const { userId } = req.params; // Get userId from request parameters
    
            const deletedUser = await AllUser.findByIdAndDelete(userId); // Delete user by ID
    
            if (!deletedUser) {
                response.success = false;
                response.message = "User not found";
                response.data = null;
                return res.status(404).json(response);
            }
    
            response.success = true;
            response.message = "User deleted successfully";
            response.data = deletedUser;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.message = "Internal Server Error";
            response.data = null;
            res.status(500).json(response);
        }
}

module.exports.getUserById = async (req, res) => {
        try {
            const { userId } = req.params; // Get userId from request parameters
    
            const user = await AllUser.findById(userId); // Find user by ID
    
            if (!user) {
                response.success = false;
                response.message = "User not found";
                response.data = null;
                return res.status(404).json(response);
            }
    
            response.success = true;
            response.message = "User retrieved successfully";
            response.data = user;
            res.status(200).json(response);
        } catch (error) {
            response.success = false;
            response.message = "Internal Server Error";
            response.data = null;
            res.status(500).json(response);
        }
}

module.exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters
        const { name, email, phoneNo, address } = req.body; // Get update fields from request body

        const updatedUser = await AllUser.findByIdAndUpdate(
            userId,
            { name, email, phoneNo, address },
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        if (!updatedUser) {
            response.success = false;
            response.message = "User not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "User updated successfully";
        response.data = updatedUser;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

    
    
