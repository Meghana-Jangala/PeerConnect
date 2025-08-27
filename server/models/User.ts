import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  canTeach: string[];
  wantToLearn: string[];
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    canTeach: {
      type: [String],
      default: [],
    },
    wantToLearn: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// 🔒 Hash password before saving
UserSchema.pre("save", async function (next) {
  const user = this as IUser;
  console.log("🟡 Pre-save hook triggered for user:", user.email);

  if (!user.isModified("password")) {
    console.log("ℹ️ Password not modified, skipping hashing.");
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    console.log("✅ Generated salt for password hashing.");

    user.password = await bcrypt.hash(user.password, salt);
    console.log("🔑 Password hashed successfully.");
    next();
  } catch (err) {
    console.error("❌ Error hashing password:", err);
    next(err as any);
  }
});

// 🔑 Compare password for login
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  console.log("🔍 Comparing password for user:", this.email);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log("✅ Password match result:", isMatch);
  return isMatch;
};

export const User = mongoose.model<IUser>("User", UserSchema);
