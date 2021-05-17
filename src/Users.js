var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema(
{
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    appData: {
      Wins: Number
    }
},
{
    timestamps: true,
    collection: 'ConnectUsers',
    strict: false
 }
);

module.exports = mongoose.model("Users", UserSchema, "ConnectUsers")