import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v); // simple email regex
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    password: {
      type: String,
      // validate: {
      //   function(v) {
      //     return "regex".test(v);
      //   },
      //   message: (props) => `${(props, value)} is not a Valid Password`,
      // },
      required: [true, "Password is Required"],
    },
    profilepic: {
      type: String,
    },
    otpToken: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, salt);
    // this.otpToken = generateOtp();
    // this.otpExpiry = Date.now() + 600000;
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
