import { Formik, Form } from "formik";
import {
  Input,
  Select,
  Tabs,
  TabList,
  Tab,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  resetForm,
  setBeneficiaryNameOfField,
  setPaymentEntityType,
  setPaymentMethodType,
} from "../redux/FormDataReducer";
import { removeUnderscore } from "../utils/removeUnderscorePlaceholder";
import { InitialValues, getInitialValues } from "../utils/getInitialValues";
import { getValidationSchema } from "../utils/getValidationSchema";

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

  const initialValues = getInitialValues(
    selectedPaymentEntityType as string,
    paymentMethodtype as string
  );

  const validationSchema = getValidationSchema();

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
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
                          <div className="flex-col-reverse" key={index}>
                            <FormControl
                              isInvalid={Boolean(
                                formik.errors[
                                  companyName as keyof typeof formik.values
                                ]
                              )}
                              id={companyName}
                            >
                              <Input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder={removeUnderscore(companyName)}
                                name={companyName}
                                id={companyName}
                                value={
                                  formik.values[
                                    companyName as keyof InitialValues
                                  ] || ""
                                }
                              />
                              <FormErrorMessage>
                                {
                                  formik.errors[
                                    companyName as keyof typeof formik.values
                                  ]
                                }
                              </FormErrorMessage>
                            </FormControl>
                          </div>
                        );
                      })
                    : beneficiaryFieldName.map(
                        (beneficiaryNameField, index) => {
                          if (
                            beneficiaryNameField === "beneficiary_first_name"
                          ) {
                            return (
                              <>
                                <Input
                                  key={index}
                                  id={beneficiaryNameField}
                                  name={beneficiaryNameField}
                                  onChange={formik.handleChange}
                                  placeholder={removeUnderscore(
                                    beneficiaryNameField
                                  )}
                                  value={
                                    formik.values[beneficiaryNameField] || ""
                                  }
                                />
                              </>
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
                                placeholder={removeUnderscore(
                                  beneficiaryNameField
                                )}
                                value={
                                  formik.values[beneficiaryNameField] || ""
                                }
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
                        <FormControl
                          isInvalid={
                            formik.errors[field] && formik.touched[field]
                          }
                          id={field}
                          key={index}
                        >
                          <Input
                            onBlur={formik.handleBlur}
                            placeholder={removeUnderscore(field)}
                            name={field}
                            id={field}
                            onChange={formik.handleChange}
                            value={
                              formik.values[field as keyof InitialValues] || ""
                            }
                          />
                          <FormErrorMessage>
                            {formik.errors[field]}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    })
                  : costantsPriorityFieldsOfForm.map((field, index) => {
                      return (
                        <FormControl
                          isInvalid={
                            formik.errors[field] && formik.touched[field]
                          }
                          key={index}
                        >
                          <Input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder={removeUnderscore(field)}
                            name={field}
                            id={field}
                            value={
                              formik.values[field as keyof InitialValues] || ""
                            }
                          />
                          <FormErrorMessage>
                            {formik.errors[field]}
                          </FormErrorMessage>
                        </FormControl>
                      );
                    })}
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    type="button"
                    colorScheme="teal"
                    variant={"outline"}
                    onClick={() => formik.resetForm({ values: initialValues })}
                  >
                    Resetta il form
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    sx={
                      !formik.isValid
                        ? {
                            opacity: 0.5,
                            pointerEvents: "none",
                          }
                        : { opacity: 1, pointerEvents: "normal" }
                    }
                  >
                    Invia
                  </Button>
                </div>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
