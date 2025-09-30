import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
