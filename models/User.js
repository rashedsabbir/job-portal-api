const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "Password {VALUE} is not strong enough.",
      },
    },

    // confirmPassword: {
    //   type: String,
    //   required: [true, "Please confirm your password"],
    //   validate: {
    //     validator: function (value) {
    //       return value === this.password;
    //     },
    //     message: "Passwords don't match!",
    //   },
    // },

    role: {
      type: String,
      enum: ["candidate", "hiring-manager", "admin"],
      default: "candidate",
    },

    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },

    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number",
      ],
    },

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },

    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },

    appliedJobs: [
      {
        type: ObjectId,
        ref: "Application",
      },
    ],

    createdJobs: [
      {
        type: ObjectId,
        ref: "Job",
      },
    ],

    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", function (next) {
//   const password = this.password;
//   const hashedPassword = bcrypt.hashSync(password);

//   this.password = hashedPassword;
//   this.confirmPassword = undefined;
//   next();
// });

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);

  return isPasswordValid;
};

userSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.confirmationToken = token;

  const date = new Date();

  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;