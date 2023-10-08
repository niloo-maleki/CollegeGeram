import React, { useEffect, useState } from "react";
import email from "assets/icons/gmail.svg";
import key from "assets/icons/key.svg";
import person from "assets/icons/person.svg";
import camera from "assets/icons/camera.svg";
import UploadFile from "../components/UploadFile";
import Swicher from "../components/Swicher";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Modal from "components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalSelector } from "features/modal/modalSlice";
import FormInput from "components/FormInput";
import { edithProfileValidationSchema } from "constants/helpers/schema";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API_IMAGE } from "features/api/apiSlice";
import {
  useGetUserQuery,
  usePostEdithUserMutation,
} from "features/user/userApi";
import { ReactComponent as Cancel } from "assets/icons/cancel.svg";

export type FormDataForRegister = yup.InferType<
  typeof edithProfileValidationSchema
>;

const EditProfileModal = () => {
  const { data: userData } = useGetUserQuery();

  const initialValues: FormDataForRegister = {
    email: userData?.email || "",
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    password: "",
    repeat_password: "",
    isPrivate: false,
    profile: camera,
    bio: userData?.bio || "",
    isDeleted: false,
  };

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormDataForRegister>({
    mode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(edithProfileValidationSchema),
  });

  const [postData] = usePostEdithUserMutation();
  const [privetPage, setPrivetPage] = useState<boolean>(true);
  const [image, setImage] = useState<string>(camera);

  useEffect(() => {
    if (!userData) return;
    setPrivetPage(userData.isPrivate);
    userData.profilePicture !== "" ? setImage(`${API_IMAGE}${userData.profilePicture}`) : setImage(camera);
  }, [userData]);

  const showModal = useSelector(modalSelector);
  const dispatch = useDispatch();

  const handlerSwich = () => {
    setPrivetPage((prevPrivetPage) => !prevPrivetPage);
    setValue("isPrivate", !privetPage);
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.currentTarget.files;
    const arr = Array.from(files || []);
    const newImage = URL.createObjectURL(arr[0]);
    setImage(newImage);
    setValue("profile", arr[0]);
  };

  const onClose = () => {
    setImage(`${API_IMAGE}${userData?.profilePicture}`);
    reset();
    dispatch(closeModal());
  };

  const deleteProfileHandler = () => {
    setImage(camera);
    setValue("profile","")
    setValue("isDeleted", true);
  };

  const onSubmit: SubmitHandler<FormDataForRegister> = async (
    data: FormDataForRegister
  ) => {
    const { repeat_password, ...user } = data;
    const _form = new FormData();
    Object.keys(user).forEach((key) => {
      const value = user[key as keyof typeof user] as string;
      _form.append(key, value);
    });
    try {
      await postData(_form);
      dispatch(closeModal());
      setValue("isDeleted", false);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      title="ویرایش حساب"
      textButtonModal="ثبت تغییرات"
      showModal={showModal}
      onclick={handleSubmit(onSubmit)}
      onclose={onClose}
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <form className="flex flex-col md:gap-3 gap-8" name="edithProfile">
          <div className="flex flex-col items-center">
            <UploadFile
              onChange={onImageChange}
              image={image}
              className="justify-center aspect-square w-20 border rounded-full border-lightYellow"
            />
            <span className="text-sm font-normal text-darkGreen">
              عکس پروفایل
            </span>
          </div>
          <div
            onClick={deleteProfileHandler}
            className="flex justify-center items-center cursor-pointer text-xs font-bold text-lightYellow gap-1"
          >
            <Cancel />
            <span>حذف تصویر</span>
          </div>
          <div className="flex flex-col md:gap-3 gap-8">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormInput
                  icon={email}
                  type="email"
                  placeholder="ایمیل"
                  field={field}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormInput
                  icon={person}
                  placeholder="نام "
                  field={field}
                  errorMessage={
                    getValues("firstName") !== ""
                      ? errors.firstName?.message
                      : ""
                  }
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormInput
                  icon={person}
                  placeholder="نام خانوادگی "
                  field={field}
                  errorMessage={
                    getValues("lastName") !== "" ? errors.lastName?.message : ""
                  }
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormInput
                  icon={key}
                  placeholder="رمز عبور "
                  autoComplete="new-password"
                  field={field}
                  errorMessage={
                    getValues("password") !== "" ? errors.password?.message : ""
                  }
                />
              )}
            />
            <Controller
              name="repeat_password"
              control={control}
              render={({ field }) => (
                <FormInput
                  icon={key}
                  placeholder="تکرار رمز عبور "
                  field={field}
                  errorMessage={errors.repeat_password?.message}
                />
              )}
            />
          </div>

          <Swicher
            onClick={handlerSwich}
            closeFraind={privetPage}
            bodyText=" پیچ خصوصی باشه"
          />
          <div className="flex flex-col w-full gap-2 ">
            <span className="text-sm font-medium text-darkGreen">بایو</span>
            <textarea
              {...register("bio")}
              className="border bg-inherit border-[#17494D80] !bg-layoutGray rounded-2xl h-20 p-3 text-right"
            ></textarea>
            {getValues("bio") !== "" && errors.bio && (
              <p>{errors?.bio?.message}</p>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
