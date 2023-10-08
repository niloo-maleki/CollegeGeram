import React, { forwardRef } from "react";
import { ReactComponent as FailureIcon } from "assets/icons/toast-error.svg";

type autoComplete = "off" | "on" | "new-password";

export interface InputProps {
  icon?: string;
  id?: string;
  iconColor?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: autoComplete;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  accept?: string;
  multiple?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement,InputProps>(
  (props: InputProps,ref) => {
  const {
    icon,
    id,
    type,
    placeholder,
    autoComplete = "off",
    onClick,
    onChange,
    onBlur,
    name,
    value,
    className,
    accept,
    multiple,
    errorMessage,
  } = props;
  return (
    <div className="flex flex-col flex-grow gap-1">
      <div
        className={`${className}
         ${
           errorMessage &&
           "border-red-600 focus:border-red-500 focus:ring-red-500"
         }
         relative flex  gap-2 items-center w-[320px] h-9 border border-lightGrayy bg-gray rounded-2xl px-4 fill-none stroke-slate-400`}
      >
        {icon && (
          <div onClick={onClick} className={`${onClick && "cursor-pointer"}`}>
            <img
              src={icon}
              className="pointer-events-none aspect-square max-w-3"
              alt="icon"
            />
          </div>
        )}
        <input
          className="peer outline-none text-sm text-gray-700 w-full
         invalid:border-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500"
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          id={id}
          value={value}
          accept={accept}
          multiple={multiple}
          ref={ref}
        />
      </div>
      {errorMessage && (
        <div className="flex gap-2 items-center justify-start w-full text-red-600 text-xs font-normal">
          <FailureIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
});

export default Input;
