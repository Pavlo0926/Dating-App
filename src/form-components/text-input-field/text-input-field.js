import React from "react";
import { TextInput } from "@components";

const TextInputField = props => {
  const {
    input,
    meta: { error, touched },
    ...rest
  } = props;
  const showError = touched && error;
  console.log(input);
  return (
    <TextInput
      onChange={input.onChange}
      name={input.name}
      {...rest}
      error={showError ? error : ""}
      allowFontScaling={false}
    />
  );
};

export default TextInputField;
