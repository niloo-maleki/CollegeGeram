import React, { ReactComponentElement, ReactNode } from "react";
import Button from "./Button";
import { buttonType } from "types/interface";

interface IModalProps {
  children: ReactNode;
  title?: string;
  textButtonModal: string;
  onclick?: () => void;
  onclose?: () => void;
  type?: buttonType;
  showModal: boolean;
  icon?: ReactComponentElement<any>;
}

const Modal = (props: IModalProps) => {
  const {
    children,
    title,
    textButtonModal,
    onclick,
    onclose,
    type,
    showModal,
    icon,
  } = props;

  return (
    <>
      {showModal && (
        <>
          <div className="flex md:py-2 md:h-full overflow-y-auto fixed md:inset-0 bottom-0 h-[calc(100%-4rem)] z-50 outline-none focus:outline-none w-full">
            <div className="flex my-auto w-full md:w-auto md:min-w-[24rem] md:h-fit h-full md:mx-auto max-w-3xl">
              {/*content*/}
              <div className="flex flex-col md:justify-center justify-around h-full w-full md:px-10 md:py-2 bg-[#F3F0EE] md:rounded-xl">
                {/*body*/}
                <div className="flex flex-col gap-3 w-full justify-center">
                  {/*header*/}
                  <div
                    className={`flex items-center justify-center ${
                      icon && "flex-col gap-1"
                    }`}
                  >
                    {icon}
                    <h1 className="text-xl font-bold text-darkGreen">
                      {title}
                    </h1>
                  </div>
                  {children}
                  {/*footer*/}
                  <div className="flex items-center justify-center py-3">
                    <Button
                      className="!text-black !bg-inherit text-sm font-semibold px-6 py-2"
                      type="button"
                      onClick={onclose}
                      buttonText="پشیمان شدم"
                    />
                    <Button
                      buttonText={textButtonModal}
                      onClick={onclick}
                      type={type}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed md:inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
export default Modal;
