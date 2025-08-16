import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
  },

  email: {
    type: String,
    validate: {
      function(v) {
        return RegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid emailid!`,
    },
    required: true,
  },

  password: {
    type: String,
    validate: {
      function(v) {
        return "regex".test(v);
      },
      message: (props) => `${(props, value)} is not a Valid Password`,
    },
    required: [true, "Password is Required"],
  },
  profilepic: {
    type: String,
  },
});
export default User = mongoose.model("User", userSchema);
