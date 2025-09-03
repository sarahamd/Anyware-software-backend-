import * as yup from "yup";
export const createUserSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
    avatar: yup.string().url().optional(),
});
export const updateUserSchema = createUserSchema.partial();
