import { Button } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { InitialValues } from "../utils/getInitialValues";

interface ButtonsProps {
  formik: FormikProps<InitialValues>;
  initialValues: InitialValues;
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Button
        type="button"
        colorScheme="pink"
        variant={"outline"}
        onClick={() => props.formik.resetForm({ values: props.initialValues })}
      >
        Resetta il form
      </Button>
      <Button
        type="submit"
        colorScheme="pink"
        isDisabled={!props.formik.isValid}
      >
        Invia
      </Button>
    </div>
  );
};

export default Buttons;
