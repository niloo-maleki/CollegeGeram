import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import envelop from "assets/icons/envelop.svg";
import { resetPasswordValidationSchema } from "constants/helpers/schema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  useGetTokenResetPasswordQuery,
  usePostResetPasswordMutation,
} from "features/user/userApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "constants/Toast";
import Loading from "components/Loading";
import { Link } from "react-router-dom";

type FormData = yup.InferType<typeof resetPasswordValidationSchema>;

const NewPassword = () => {
  const { token } = useParams();
  console.log("token", token);
  const navigate = useNavigate();
  const { data: getToken } = useGetTokenResetPasswordQuery(
    token ? token : skipToken
  );
  const [resetPassword, { isLoading }] = usePostResetPasswordMutation();
  getToken && localStorage.setItem("token", getToken?.token);

  const initialValues = {
    token: "",
    password: "",
    confirm_password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      if (!getToken) return;
      setValue("token", token);
      const { confirm_password, ...formData } = data;
      const result = await resetPassword(formData).unwrap();
      if (result.statusCode === 200) {
        toast.success("رمز عبور با موفقیت تغییر کرد", SuccessToast);
        <Navigate to="/login" replace />;
        return;
      }
    } catch (error: any) {
      toast.error("!خراب شد ظاهرا", ErrorToast);
    }
    console.log("data", data);
  };

  return (
    <div className="flex flex-col items-center gap-8 mx-auto">
      <h1 className="text-center"> تنطیم رمز عبور جدید </h1>
      <form
        name="newPassword"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col	gap-5 "
      >
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              icon={envelop}
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
          name="confirm_password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              icon={envelop}
              placeholder="تکرار رمز عبور"
              errorMessage={errors.confirm_password?.message}
              onChange={onChange} // send value to hook form
              onBlur={onBlur}
              value={value}
              type="password"
            />
          )}
        />
        <div className="flex justify-end mt-5	">
          <Button
            type="submit"
            buttonText="تنظیم رمز عبور جدید"
            disabled={isLoading && true}
            className={`px-6 ${isLoading && "bg-midGray"}`}
          />
        </div>
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <Loading />
          </div>
        )}
      </form>
    </div>
  );
};

export default NewPassword;
