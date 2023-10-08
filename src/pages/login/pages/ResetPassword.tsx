import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import envelop from "assets/icons/envelop.svg";
import { Link } from "react-router-dom";
import { usePostForgetPasswordMutation } from "features/user/userApi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorToast, SuccessToast } from "constants/Toast";
import Loading from "components/Loading";

const ResetPassword = () => {
  const [forgetPassword, { isLoading }] = usePostForgetPasswordMutation();
  const initialValues = {
    userName: "",
  };

  const { control, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<any> = async (dataForm: any) => {
    try {
      const result = await forgetPassword(dataForm.userName).unwrap();
      if (result.statusCode === 200) {
        toast.success("لینک بازیابی به ایمیل شما ارسال شد", SuccessToast);
        return;
      }
    } catch (error: any) {
      toast.error("!خراب شد ظاهرا", ErrorToast);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-5 mx-auto"
      name="login"
    >
      <div className="flex flex-col items-center gap-6 mx-auto">
        <h1 className="text-center">بازیابی رمز عبور</h1>
        <div className="flex flex-col	gap-6 ">
          <Controller
            name="userName"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                icon={envelop}
                placeholder="نام کاربری یا ایمیل"
                onChange={onChange} // send value to hook form
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <div className="flex items-center justify-between">
            <Link className="" to="/login">
              انصراف
            </Link>
            <Button
              type="submit"
              buttonText="ارسال لینک بازیابی رمز عبور"
              disabled={isLoading && true}
              className={`px-6 ${isLoading && "bg-midGray"}`}
            ></Button>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <Loading />
        </div>
      )}
    </form>
  );
};

export default ResetPassword;
