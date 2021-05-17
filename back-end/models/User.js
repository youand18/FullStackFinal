var mongoose = require("mongoose")

var Schema = mongoose.Schema

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

// Export model
module.exports = mongoose.model("User", UserSchema, "ConnectUsers")