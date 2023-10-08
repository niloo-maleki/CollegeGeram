import React from "react";
import Modal from "components/Modal";
import { closeModal, modalSelector } from "features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { IEditPost } from "types/interface";
import { useForm } from "react-hook-form";
import { useEditPostMutation } from "features/accountApi";

const EditPost = ({ postId }: { postId: number }) => {
  const showModal = useSelector(modalSelector);
  const dispatch = useDispatch();
  const [editPost, { isLoading }] = useEditPostMutation();

  const initialValues: IEditPost = {
    body: "",
    tags: "",
    postId: postId,
  };

  const { handleSubmit, setValue, register, reset } = useForm({
    mode: "onBlur",
    defaultValues: initialValues,
  });

  const onSubmit = (data: IEditPost) => {
    editPost(data);
    reset();
    dispatch(closeModal());
  };

  return (
    <Modal
      title="ویرایش پست"
      showModal={showModal}
      textButtonModal="ثبت عکس"
      onclick={handleSubmit(onSubmit)}
      onclose={() => dispatch(closeModal())}
    >
      <div className="flex flex-col gap-12 justify-center w-full">
        <form>
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
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPost;
