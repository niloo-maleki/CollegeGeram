import React, { useState } from "react";
import add from "assets/icons/add.svg";
import remove from "assets/icons/delete.svg";
import Swicher from "../components/Swicher";
import UploadFile from "../components/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalSelector } from "features/modal/modalSlice";
import Modal from "components/Modal";
import { usePostCreatePostMutation } from "features/accountApi";
import { useForm } from "react-hook-form";
import { ICreatePost } from "types/interface";

const AddPostModal = () => {
  const [closeFriend, setcloseFriend] = useState<boolean>(true);
  const [images, setImages] = useState<any[]>([]);
  const [blobImages, setBlobImages] = useState<File[]>([]);
  const showModal = useSelector(modalSelector);
  const dispatch = useDispatch();
  const [createPost] = usePostCreatePostMutation();

  const initialValues: ICreatePost = {
    body: "",
    tags: "",
    images: [],
  };

  const { handleSubmit, setValue, register, reset } = useForm({
    mode: "onBlur",
    defaultValues: initialValues,
  });

  const handlerSwich = () => {
    setcloseFriend(!closeFriend);
    // setValue("isPrivate", !closeFriend);
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.currentTarget.files;
    const arayFiles = Array.from(files || []);
    uploadImages(arayFiles);
  };

  const uploadImages = (arayFiles: File[]) => {
    const blobUrl = arayFiles.map((item) => URL.createObjectURL(item));
    setImages([...images, ...blobUrl]);
    setBlobImages([...images, ...arayFiles]);
    setValue("images", [...blobImages, ...arayFiles]);
  };

  const removeImage = (img: string) => {
    const filter = images.filter((item) => item !== img);
    setImages(filter);
  };

  const onSubmit = (data: ICreatePost) => {
    const _form = new FormData();
    data.body && _form.append("body", data.body);
    data.tags && _form.append("tags", data.tags);
    data.images.map((item) => _form.append("images", item));

    try {
      createPost(_form);
    } catch (error) {
    }
    reset();
    setImages([]);
    dispatch(closeModal());
  };

  const posts = images.map((img) => {
    return (
      <div key={img} className="flex relative ">
        <div
          onClick={() => removeImage(img)}
          className="flex items-center justify-center aspect-square w-5 absolute top-[-4px] right-[-4px] bg-white hover:bg-yellow-200 rounded-full "
        >
          <img className="" src={remove} alt="remove" />
        </div>
        <img
          className="aspect-square object-cover w-28 rounded-3xl"
          src={img}
          alt="post"
        />
      </div>
    );
  });
const closeModalHandler =(()=>{
  dispatch(closeModal())
  reset()
})
  return (
    <Modal
      title="افزودن پست"
      showModal={showModal}
      textButtonModal="ثبت عکس"
      onclick={handleSubmit(onSubmit)}
      onclose={closeModalHandler}
    >
      <div className="flex flex-col gap-12 justify-center w-full">
        <form>
          <div className="flex items-center cursor-pointer justify-start mt-4   ">
            <div className="flex flex-col gap-8 justify-center">
              <UploadFile
                onChange={onImageChange}
                image={add}
                className="gap-2"
                bodyText="بارگذاری عکس ها"
              />
              {posts.length >= 1 && (
                <div className="grid grid-cols-4 gap-2 items-center justify-center ">
                  {posts}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm font-medium text-darkGreen">توضیحات</span>
            <textarea
              {...register("body")}
              className="border border-[#17494D80] px-4 py-2 rounded-xl h-24 resize-none bg-inherit"
            ></textarea>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col w-full ">
              <span className="text-sm font-medium text-darkGreen">تگ ها</span>
              <textarea
                {...register("tags")}
                className="border border-[#17494D80] rounded-xl h-10 bg-inherit p-3"
              ></textarea>
            </div>
            <Swicher
              onClick={handlerSwich}
              closeFraind={closeFriend}
              bodyText="فقط نمایش به دوستان نزدیک"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPostModal;
