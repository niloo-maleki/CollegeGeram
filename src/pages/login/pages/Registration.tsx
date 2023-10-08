import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import person from "assets/icons/person.svg";
import key from "assets/icons/key.svg";
import gmail from "assets/icons/gmail.svg";
import * as yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "constants/helpers/schema";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "constants/Toast";
import { toast } from "react-toastify";
import Loading from "components/Loading";
import { useRegisterMutation } from "features/user/userApi";

export type FormDataForRegister = yup.InferType<
  typeof registerValidationSchema
>;

const Registration = () => {
  const [postRegister, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeat_password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataForRegister>({
    mode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit: SubmitHandler<FormDataForRegister> = async (
    data: FormDataForRegister
  ) => {
    try {
      const { repeat_password, ...formData } = data;
      const result = await postRegister(formData).unwrap();
      if (result.data.token) {
        navigate("/home");
        toast.success("با موفقیت وارد شدید", SuccessToast);
        localStorage.setItem("token", result.data.token);
      }
    } catch (error: any) {
      toast.error("!خراب شد ظاهرا", ErrorToast);
    }
  };
  return (
    <form
      className="flex flex-col items-center gap-5 mx-auto"
      name="registration"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            icon={person}
            placeholder="نام کاربری"
            errorMessage={errors.username?.message}
            onChange={onChange} // send value to hook form
            onBlur={onBlur}
            value={value}
            autoComplete="on"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            icon={gmail}
            placeholder="ایمیل"
            errorMessage={errors.email?.message}
            onChange={onChange} // send value to hook form
            onBlur={onBlur}
            value={value}
            type="email"
            autoComplete="on"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Input
            icon={key}
            placeholder="رمز عبور"
            autoComplete="new-password"
            errorMessage={errors.password?.message}
            onChange={onChange} // send value to hook form
            onBlur={onBlur}
            value={value}
            type="password"
          />
        )}
      />
      <Controller
        name="repeat_password"
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <Input
            icon={key}
            placeholder="تکرار رمز عبور"
            errorMessage={errors.repeat_password?.message}
            onChange={onChange} // send value to hook form
            onBlur={onBlur}
            type="password"
          />
        )}
      />
      <div className="flex items-center self-end">
        <Button
          type="submit"
          disabled={isLoading && true}
          className={`px-5 ${isLoading && "bg-midGray"}`}
          buttonText="ثبت نام"
        ></Button>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <Loading />
        </div>
      )}
    </form>
  );
};

export default Registration;
