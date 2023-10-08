import * as yup from "yup";

const errorMessages = {
  required: "این فیلد اجباری است",
  email: "ایمیل نامعتبر است",
  passwordMin: "رمز عبور باید حداقل 8 کاراکتر داشته باشد",
  passwordMax: "رمز عبور باید حداکثر 32 کاراکتر داشته باشد",
  passwordPattern: "رمز عبور باید شامل یک حرف بزرگ و یک حرف کوچک و یک عدد باشد",
  notConfirmPassword: "تکرار رمز عبور اشتباه است",
};

const englishNamePattern = /^[A-Za-z]+$/;
const persianNamePattern = /^[\u0600-\u06FF\s]+$/;

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "نام کاربری باید باید حداقل از 4 کاراکتر تشکیل شده باشد")
    .max(64, "نام کاربری باید حداکرثر 64 کاراکتر باشد")
    .matches(/^[^@]+$/, "نام کاربری نمیتواند ایمیل باشد")
    .matches(/^[^\d].*$/, "نام کاربری نمیتواند با عدد شروع شود")
    .matches(/^[^-\s]+$/, " نام کاربری نمیتواند شامل - باشد")
    .required("وارد کردن نام کاربری الزامی است"),
  email: yup
    .string()
    .email("فرمت ایمیل اشتباه است")
    .required("وارد کردن ایمیل الزامی است"),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .max(32, "رمز عبور باید حداکثر 32 کاراکتر باشد.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
      "رمز عبور باید شامل یک حرف بزرگ و کوچک و یک عدد باشد"
    )
    .required("رمز عبور را وارد کنید"),
  repeat_password: yup
    .string()
    .oneOf([yup.ref("password")], "تکرار رمز عبور اشتباه است")
    .required("تکرار رمز عبور را وارد کنید"),
});

////login validation
export const loginValidationSchema = yup.object().shape({
  loginIdentifier: yup
    .string()
    .min(4, "نام کاربری باید باید حداقل از 4 کاراکتر تشکیل شده باشد")
    .max(64, "نام کاربری باید حداکرثر 64 کاراکتر باشد")
    .required("وارد کردن نام کاربری الزامی است"),
  password: yup
    .string()
    .min(8, "رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .max(32, "رمز عبور باید حداکثر 32 کاراکتر باشد.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
      "رمز عبور باید شامل یک حرف بزرگ و کوچک و یک عدد باشد"
    )
    .required("رمز عبور را وارد کنید"),
});

export const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "کلمه عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .max(32, "کلمه عبور باید حداکثر 32 کاراکتر باشد.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
      "پسورد باید شامل یک حرف بزرگ و کوچک و یک عدد باشد"
    )
    .required("رمز‌ عبور را وارد کنید"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "تکرار رمز عبور اشتباه است")
    .required("تکرار رمز عبور را وارد کنید"),
});

export const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "کلمه عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.")
    .max(32, "کلمه عبور باید حداکثر 32 کاراکتر باشد.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
      "پسورد باید شامل یک حرف بزرگ و کوچک و یک عدد باشد"
    )
    .required("رمز‌ عبور را وارد کنید"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "تکرار رمز عبور اشتباه است")
    .required("تکرار رمز عبور را وارد کنید"),
  token: yup.string(),
});

export const edithProfileValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .test("is-valid-name", "نام صحیح نمی باشد", function (value) {
      if (value && value.trim() !== "") {
        if (englishNamePattern.test(value) || persianNamePattern.test(value)) {
          return true; // Name is valid
        } else {
          return false; // Name is invalid
        }
      }
      return true; // Allow null or empty values
    }),
  lastName: yup
    .string()
    .test("is-valid-lastName", "نام خانوادگی صحیح نمی باشد", function (value) {
      if (value && value.trim() !== "") {
        if (englishNamePattern.test(value) || persianNamePattern.test(value)) {
          return true; // Name is valid
        } else {
          return false; // Name is invalid
        }
      }
      return true; // Allow null or empty values
    }),

  email: yup
    .string()
    .email("فرمت ایمیل اشتباه است")
    .required("وارد کردن ایمیل الزامی است"),

  password: yup
    .string()
    .test("password", "رمز عبور صحیح نمی باشد", function (value) {
      if (value && value.trim() !== "") {
        return yup
          .string()
          .min(8, errorMessages.passwordMin)
          .max(32, errorMessages.passwordMax)
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
            errorMessages.passwordPattern
          )
          .isValidSync(value);
      }
      return true; // Allow null or empty values
    }),

  repeat_password: yup
    .string()
    .optional()
    .oneOf([yup.ref("password")], errorMessages.notConfirmPassword),

  isPrivate: yup.boolean(),
  isDeleted: yup.boolean(),
  profile: yup.mixed(),
  bio: yup.string(),
});
