const bcrypt = require("bcrypt");

module.exports.hashPassword = async (password) => {
    try {
       const hashedPassword = await bcrypt.hash(password, 10);
       return hashedPassword;
    } catch (error) {
        console.log("Error:", error);
        throw new Error("Password Hashing Failed.");
    }
}

module.exports.comparePassword = async (password, hashedPassword) => {
    try {
        if(!password && !hashedPassword){
            throw new Error("Password and hashed password are required for comparison,")
        }
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.log(error);
        throw new Error("Password comparison failed.")
    }
}