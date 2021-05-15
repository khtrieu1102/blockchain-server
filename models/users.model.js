const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

const UserSchema = mongoose.Schema(
	{
		username: String,
		passwordHash: String,
		privateKey: String, //
		publickey: String, //
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.setPasswordHash = function (password) {
	this.passwordHash = bcrypt.hashSync(password, saltRounds);
};

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
