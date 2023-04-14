const mongoose = require("mongoose");
const MeetingSchema = new mongoose.Schema({
  type: { type: String },
  status: { type: String ,default:"scheduled"},
  meetingId: { type: String },
  title: { type: String },
  description: { type: String },
  startTime:{ type: String },
  endTime: { type: String },
});

// Define a mongoose model for the data
const MeetingModel = mongoose.model("Meeting", MeetingSchema);

module.exports = {
  MeetingModel,
};
