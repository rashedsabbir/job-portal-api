const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const date = new Date();
date.setDate(date.getSeconds() + 1);

const jobSchema = mongoose.Schema(
  {
    createdBy: {
      email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        required: [true, "Please provide a Hiring Manager Email"],
      },
      id: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please provide a Hiring Manager id"],
      },
    },

    jobTitle: {
      type: String,
      required: [true, "Please provide a jobTitle"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [200, "Name is too large"],
    },

    jobType: {
      type: String,
      required: [true, "Please provide a jobType"],
      trim: true,
    },

    companyName: {
      type: String,
      required: [true, "Please provide a companyName"],
    },

    location: {
      type: String,
      required: [true, "Please provide a company location"],
    },

    salary: {
      type: Number,
      required: [true, "Please provide a salary"],
    },

    jobDescription: String,

    applicationEmailOrLink: {
      type: String,
      required: [true, "Please provide a application Email Or Link"],
      validate: [
        validator.isEmail || validator.isURL,
        "Provide a valid Email or Link",
      ],
    },

    appliedBy: [
      {
        name: String,

        email: {
          type: String,
          validate: [validator.isEmail, "Provide a valid Email"],
        },

        id: {
          type: ObjectId,
          ref: "User",
        },

        applicationId: {
          type: ObjectId,
          ref: "Application",
        },

        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],

    deadline: {
      type: Date,
      required: [true, "Please provide a deadline"],
      default: date,
    },

    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;