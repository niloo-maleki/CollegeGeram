import React from "react";

type buttonType = 'submit' | 'reset' | 'button';

interface IButtonProps {
  buttonText: string;
  className?: string;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: buttonType;
  disabled?: boolean;
  icon?: string;
}

const Button = (props: IButtonProps) => {
  const {
    type,
    name,
    buttonText,
    onClick,
    className,
    icon,
    disabled = false,
  } = props;
  return (
    <button
      className={`${className} bg-lightYellow items-center text-base rounded-full  text-white py-2 px-4`}
      type={type}
      name={name}
      onClick={onClick}
      disabled={disabled}
    >
      {icon &&
      <img src={icon} alt={icon}/>}
      {buttonText}
    </button>
  );
};
export default Button;
