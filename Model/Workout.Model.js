const { mongoose } = require("mongoose");

const ExersizeSchema = mongoose.Schema(
  {
    name: { type: String},
    image_url: [{ type: String}],
    desc:{ type: String},
    position:{ type: String},
    type:[
      {
        exersize:{ type: String},
        level:{ type: String},
        set:{ type: Number},
        repetition:{ type: Number},
        video:{ type: String}
      }
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  );
  
  const WorkOutModel = mongoose.model("Exersize", ExersizeSchema);

  module.exports = {
    WorkOutModel
  };