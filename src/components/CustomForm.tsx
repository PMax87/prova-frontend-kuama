import { Formik, Form } from "formik";
import { Input, Select, Tabs, TabList, Tab, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  setBeneficiaryNameOfField,
  setPaymentEntityType,
  setPaymentMethodType,
} from "../redux/FormDataReducer";
import { removeUnderscore } from "../assets/utils/removeUnderscorePlaceholder";

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
    dispatch(setPaymentEntityType(e.target.value));
    dispatch(setBeneficiaryNameOfField());
  };

  return (
    <Formik initialValues={{}} onSubmit={(values) => console.log(values)}>
      {(formik) => {
        return (
          <Form>
            <Select
              placeholder="Select a Value"
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
                <div className="flex flex-col-reverse">
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
                    : beneficiaryFieldName.map((beneficiaryNameField) => {
                        if (beneficiaryNameField === "beneficiary_first_name") {
                          return (
                            <Input
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
                        if (beneficiaryNameField === "beneficiary_last_name") {
                          return (
                            <Input
                              onChange={formik.handleChange}
                              className="capitalize"
                              placeholder={removeUnderscore(
                                beneficiaryNameField
                              )}
                            />
                          );
                        }
                      })}
                </div>
                <Tabs onClick={(e) => onHandleTabChange(e)}>
                  <TabList>
                    {paymentsType.map((paymentType, index) => {
                      return <Tab key={index}>{paymentType}</Tab>;
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
            <Button type="submit">Invia</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
