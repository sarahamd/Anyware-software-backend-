import { ValidationError } from "../errors/ValidationError";
import adminModel from "../models/admin.model";
import bcrypt from "bcrypt";
import * as yup from "yup";

const adminSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  avatar: yup.string().optional(),
});

class adminAuthService {
  async createAdmin({
    name,
    email,
    password,
   
    avatar,
  }: {
    name: string;
    email: string;
    password: string;
   
    avatar?: string;
  }) {
    try {
      await adminSchema.validate({ name, email, password, avatar });
    } catch (err: any) {
      throw new ValidationError(err.message);
    }

    const emailExists = await adminModel.findOne({ email });
    if (emailExists) {
      throw new ValidationError("Email already exists");
    }

  

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    const { password: _, ...rest } = admin?.toObject();

    return rest;
  }

  async loginAdmin({ email, password }: { email: string; password: string }) {
    const admin = await adminModel.findOne({ email }).lean();
    if (!admin) {
      throw new ValidationError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new ValidationError("Invalid email or password");
    }

    const { password: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  }
}

export default new adminAuthService();
