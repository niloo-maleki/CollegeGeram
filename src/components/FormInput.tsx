import React from "react";
import { FieldValues, FieldPath, ControllerRenderProps } from "react-hook-form";
import Input, { InputProps } from "./Input";

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: InputProps & { field: ControllerRenderProps<TFieldValues, TName> }
) => {
  return (
    <Input
      {...props}
      onChange={props.field.onChange} // send value to hook form
      onBlur={props.field.onBlur}
      value={props.field.value}
    />
  );
};

export default FormInput;
