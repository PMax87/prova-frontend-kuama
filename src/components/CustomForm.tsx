import { Formik, Form } from "formik";
import { Input, Select, Tabs, TabList, Tab, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  resetForm,
  setBeneficiaryNameOfField,
  setPaymentEntityType,
  setPaymentMethodType,
} from "../redux/FormDataReducer";
import { removeUnderscore } from "../assets/utils/removeUnderscorePlaceholder";

interface PropsType {
  onHandleTabChange: () => void;
  onHandelChangeEntity: () => void;
}

const CustomForm = () => {
  const dispatch = useDispatch();

  const paymentsEntityType = useSelector(
    (state: RootState) => state.formData.uniqueEntityType
  );

  const paymentsType = useSelector(
    (state: RootState) => state.formData.uniquePaymentsType
  );

  const costantsPriorityFieldsOfForm = useSelector(
    (state: RootState) => state.formData.costantFieldsOfFrom
  );

  const selectedPaymentEntityType = useSelector(
    (state: RootState) => state.formData.paymentEntityType
  );

  const paymentMethodtype = useSelector(
    (state: RootState) => state.formData.paymentMethodType
  );

  const regularPaymentFieldOfForm = useSelector(
    (state: RootState) => state.formData.costantRegularPayments
  );

  const beneficiaryFieldName = useSelector(
    (state: RootState) => state.formData.companyNameField
  );

  const onHandleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const value = (e.target as HTMLDivElement).textContent;
    dispatch(setPaymentMethodType(value as string));
  };

  const onHandelChangeEntity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      dispatch(resetForm());
    } else {
      dispatch(setPaymentEntityType(value));
    }
    dispatch(setBeneficiaryNameOfField());
  };

  return (
    <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
      {(formik) => {
        return (
          <Form className="flex flex-col gap-6 w-[560px] shadow-xl p-10">
            <Select
              placeholder="Seleziona un tipo di pagamento"
              className="capitalize"
              onChange={(e) => onHandelChangeEntity(e)}
            >
              {paymentsEntityType.map((entityType, index) => {
                return (
                  <option className="capitalize" key={index}>
                    {entityType}
                  </option>
                );
              })}
            </Select>
            {selectedPaymentEntityType && (
              <>
                <div className="flex flex-col-reverse gap-6">
                  {selectedPaymentEntityType === "company"
                    ? beneficiaryFieldName.map((companyName, index) => {
                        return (
                          <Input
                            onChange={formik.handleChange}
                            className="capitalize"
                            placeholder={removeUnderscore(companyName)}
                            key={index}
                            name={companyName}
                            id={companyName}
                          />
                        );
                      })
                    : beneficiaryFieldName.map(
                        (beneficiaryNameField, index) => {
                          if (
                            beneficiaryNameField === "beneficiary_first_name"
                          ) {
                            return (
                              <Input
                                key={index}
                                id={beneficiaryNameField}
                                name={beneficiaryNameField}
                                onChange={formik.handleChange}
                                className="capitalize"
                                placeholder={removeUnderscore(
                                  beneficiaryNameField
                                )}
                              />
                            );
                          }
                          if (
                            beneficiaryNameField === "beneficiary_last_name"
                          ) {
                            return (
                              <Input
                                key={index}
                                id={beneficiaryNameField}
                                name={beneficiaryNameField}
                                onChange={formik.handleChange}
                                className="capitalize"
                                placeholder={removeUnderscore(
                                  beneficiaryNameField
                                )}
                              />
                            );
                          }
                        }
                      )}
                </div>
                <Tabs onClick={(e) => onHandleTabChange(e)} className="w-full">
                  <TabList>
                    {paymentsType.map((paymentType, index) => {
                      return (
                        <Tab key={index} className="capitalize w-1/2">
                          {paymentType}
                        </Tab>
                      );
                    })}
                  </TabList>
                </Tabs>
                {paymentMethodtype === "regular"
                  ? regularPaymentFieldOfForm.map((field, index) => {
                      return (
                        <Input
                          placeholder={field}
                          key={index}
                          name={field}
                          id={field}
                        />
                      );
                    })
                  : costantsPriorityFieldsOfForm.map((field, index) => {
                      return (
                        <Input
                          onChange={formik.handleChange}
                          placeholder={removeUnderscore(field)}
                          className="capitalize"
                          key={index}
                          name={field}
                          id={field}
                        />
                      );
                    })}
              </>
            )}
            <div className="grid grid-cols-2 gap-6">
              <Button
                type="button"
                colorScheme="teal"
                variant={"outline"}
                onClick={() => formik.resetForm()}
              >
                Resetta il form
              </Button>
              <Button type="submit" colorScheme="teal">
                Invia
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
