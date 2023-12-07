import React from "react";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { removeUnderscore } from "../utils/removeUnderscorePlaceholder";
import { InitialValues } from "../utils/getInitialValues";

interface TextInputProps {
  formik: FormikProps<InitialValues>;
  id: string;
  name: string;
  placeholder: string;
  value: string;
}

const InputWithValidation: React.FC<TextInputProps> = (props) => {
  return (
    <div className="flex-col-reverse">
      <FormControl
        id={props.name}
        isInvalid={Boolean(
          props.formik.errors[props.name as keyof typeof props.formik.values] &&
            props.formik.touched[props.name as keyof typeof props.formik.values]
        )}
      >
        <Input
          onBlur={props.formik.handleBlur}
          onChange={props.formik.handleChange}
          placeholder={removeUnderscore(props.placeholder)}
          id={props.name}
          name={props.name}
          value={props.formik.values[props.name as keyof InitialValues] || ""}
        />
        <FormErrorMessage>
          {props.formik.errors[props.name as keyof typeof props.formik.values]}
        </FormErrorMessage>
      </FormControl>
    </div>
  );
};

export default InputWithValidation;
