const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const applicationSchema = mongoose.Schema(
  {
    jobInfo: {
      companyName: {
        type: String,
        required: [true, "Please provide a company Name"],
      },

      jobTitle: {
        type: String,
        required: [true, "Please provide a job Title"],
      },

      id: {
        type: ObjectId,
        ref: "Job",
        required: [true, "Please provide a job id"],
      },
    },

    candidateName: {
      type: String,
      required: [true, "Please provide a candidate Name"],
    },

    candidateEmail: {
      type: String,
      required: [true, "Please provide a email"],
      validate: [validator.isEmail, "Provide a valid Email"],
    },

    candidateId: {
      type: ObjectId,
      required: [true, "Please provide a candidate Id"],
      ref: "User",
    },

    candidatePhoneNumber: {
      type: String,
      required: [true, "Please provide a candidate Phone Number"],
    },

    candidateAddress: String,

    resume: String,
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;