// // models/User.ts
// import { Schema, model, models } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: { type: String },
//     email: { type: String, unique: true },
//     password: { type: String, required: true }, // required for credentials login
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user", // ✅ Default role
//     },
//   },
//   { timestamps: true }
// );

// const User = models.User || model("User", userSchema);
// export default User;


import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      // Not required because Google users won't have passwords
      required: false 
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);


const User = models.User || model("User", userSchema);
export default User;