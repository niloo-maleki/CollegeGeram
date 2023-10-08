import React from "react";

interface ICheckBoxProps{
    id:string,
    value?:string,
    labelText:string
}

const CheckBox = (props:ICheckBoxProps) => {
const {id,labelText}= props
  return (
    <>
      <input
        id={id}
        type="checkbox"
        value=""
        className="w-4 h-4 appearance-none
        bg-gray border-zinc-300 rounded 
        cursor-pointer
        checked:after:absolute checked:after:my-auto checked:after:mr-1
        checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] 
        checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0
        checked:after:border-t-0 checked:after:border-solid checked:after:border-black"
      />

      <label
        className="hover:cursor-pointer text-xs font-normal text-darkGray"
        htmlFor={id}
      >
        {labelText}
      </label>
    </>
  );
};

export default CheckBox;
