import * as yup from "yup";

export const createQuizSchema = yup.object({
  name: yup.string().required("Quiz name is required"),
  course: yup.string().required("Course is required"),
  semester: yup.string().required("Semester is required"),
  questions: yup.array().of(
    yup.object({
      questionText: yup.string().required("Question text is required"),
      options: yup.array().of(yup.string().required()).min(2).required(),
      correctAnswerIndex: yup.number().required(),
    })
  ),
  dueDate: yup.date().required("Due date is required"),
});

export const updateQuizSchema = createQuizSchema.partial();
