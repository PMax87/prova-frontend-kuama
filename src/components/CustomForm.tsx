import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { getInitialValues } from "../utils/getInitialValues";
import { getValidationSchema } from "../utils/getValidationSchema";
import SelectEntityType from "./SelectEntityType";
import InputWithValidation from "./InputWithValidation";
import PaymentsMethodTab from "./PaymentsMethodTab";
import Buttons from "./Buttons";

const CustomForm = () => {
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

  const initialValues = getInitialValues(
    selectedPaymentEntityType as string,
    paymentMethodtype as string
  );

  const validationSchema = getValidationSchema(
    selectedPaymentEntityType as string,
    paymentMethodtype as string
  );

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
            <SelectEntityType />
            {selectedPaymentEntityType && (
              <>
                <div className="flex flex-col-reverse gap-6">
                  {selectedPaymentEntityType === "company"
                    ? beneficiaryFieldName.map((companyName, index) => {
                        return (
                          <InputWithValidation
                            formik={formik}
                            id={companyName}
                            key={index}
                            name={companyName}
                            placeholder={companyName}
                            value={companyName}
                          />
                        );
                      })
                    : beneficiaryFieldName.map(
                        (individualBeneficiaryField, index) => {
                          if (
                            individualBeneficiaryField ===
                            "beneficiary_first_name"
                          ) {
                            return (
                              <InputWithValidation
                                formik={formik}
                                id={individualBeneficiaryField}
                                key={index}
                                name={individualBeneficiaryField}
                                placeholder={individualBeneficiaryField}
                                value={individualBeneficiaryField}
                              />
                            );
                          }
                          if (
                            individualBeneficiaryField ===
                            "beneficiary_last_name"
                          ) {
                            return (
                              <InputWithValidation
                                formik={formik}
                                id={individualBeneficiaryField}
                                key={index}
                                name={individualBeneficiaryField}
                                placeholder={individualBeneficiaryField}
                                value={individualBeneficiaryField}
                              />
                            );
                          }
                        }
                      )}
                </div>
                <PaymentsMethodTab />
                {paymentMethodtype === "regular"
                  ? regularPaymentFieldOfForm.map((regularField, index) => {
                      return (
                        <InputWithValidation
                          formik={formik}
                          id={regularField}
                          key={index}
                          name={regularField}
                          placeholder={regularField}
                          value={regularField}
                        />
                      );
                    })
                  : costantsPriorityFieldsOfForm.map((priorityField, index) => {
                      return (
                        <InputWithValidation
                          formik={formik}
                          id={priorityField}
                          key={index}
                          name={priorityField}
                          placeholder={priorityField}
                          value={priorityField}
                        />
                      );
                    })}
                <Buttons formik={formik} initialValues={initialValues} />
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomForm;
