const mongoose = require("mongoose");
const CoachUsersSchema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId },
  coachId: { type: mongoose.Schema.Types.ObjectId },
  endDate: { type: String },

});

// Define a mongoose model for the data
const CoachUsersModel = mongoose.model("CoachUsers", CoachUsersSchema);

module.exports = {
    CoachUsersModel
};
