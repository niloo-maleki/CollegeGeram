import React from "react";
import envelop from "assets/icons/envelop.svg";
import keyLogin from "assets/icons/keyLogin.svg";
import arrow from "assets/icons/arrow-back.svg";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import CheckBox from "components/CheckBox";
import { Link } from "react-router-dom";
import { ErrorToast, SuccessToast } from "constants/Toast";
import { toast } from "react-toastify";
import { loginValidationSchema } from "constants/helpers/schema";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import * as yup from "yup";
import Loading from "components/Loading";
import { useLoginMutation } from "features/user/userApi";

export type FormDataForLogin = yup.InferType<typeof loginValidationSchema>;

const Login = () => {
  const [loginPost, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const initialValues = {
    loginIdentifier: "",
    password: "",
  };

  const { control, handleSubmit } = useForm<FormDataForLogin>({
    mode: "onBlur",
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<FormDataForLogin> = async (
    dataForm: FormDataForLogin
  ) => {
    try {
      const result = await loginPost(dataForm).unwrap();
      if (result.data) {
        toast.success("با موفقیت وارد شدید", SuccessToast);
        localStorage.setItem("token", result.data.token);
        navigate("/home");
        return;
      }
    } catch (error: any) {
      toast.error("!خراب شد ظاهرا", ErrorToast);
    }
  };

  return (
    <div>
      <div className="flex flex-col mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 mx-auto"
          name="login"
        >
          <Controller
            name="loginIdentifier"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                icon={envelop}
                placeholder="نام کاربری یا ایمیل"
                onChange={onChange} // send value to hook form
                onBlur={onBlur}
                value={value}
                autoComplete="on"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                icon={keyLogin}
                placeholder="رمز عبور"
                onChange={onChange} // send value to hook form
                onBlur={onBlur}
                value={value}
                type="password"
                autoComplete="on"
              />
            )}
          />
          <div className="flex items-center self-start gap-2">
            <CheckBox id="" labelText="من را به خاطر بسپار" />
          </div>
          <div className="flex items-center self-end">
            <Button  disabled={isLoading && true} className={`px-6 ${isLoading && 'bg-midGray'}`} type="submit" buttonText="ورود"></Button>
          </div>
        </form>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src={arrow} alt="arrow" />
            <Link
              className="text-lightYellow text-xs font-normal"
              to="/resetpassword"
            >
              رمز عبورم رو فراموش کردم
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <img src={arrow} alt="arrow" />
            <Link
              className="text-lightYellow text-xs font-normal"
              to="/register"
            >
              ثبت نام
            </Link>
          </div>
        </div>
      </div>
      { isLoading && 
        <div className="flex justify-center items-center w-full">
         <Loading />
        </div>
      }
    </div>
  );
};
export default Login;
