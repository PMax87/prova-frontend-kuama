import * as Yup from "yup";

export const getValidationSchema = (
  selectedPaymentEntityType: string,
  paymentMethodtype: string
) => {
  if (selectedPaymentEntityType === "company") {
    if (paymentMethodtype === "regular") {
      return Yup.object().shape({
        beneficiary_company_name: Yup.string().required("Il campo è richiesto"),
        iban: Yup.string()
          .min(27, "La lunghezza dell'IBAN non è corretta")
          .max(27, "L'IBAN non può essere più lungo di 27 caratteri")
          .required("Il campo è richiesto"),
      });
    }
    return Yup.object().shape({
      beneficiary_company_name: Yup.string().required("Il campo è richiesto"),
      beneficiary_address: Yup.string().required("Il campo è richiesto"),
      iban: Yup.string()
        .min(27, "La lunghezza dell'IBAN non è corretta")
        .max(27, "L'IBAN non può essere più lungo di 27 caratteri")
        .required("Il campo è richiesto"),
      beneficiary_city: Yup.string().required("Il campo è richiesto"),
      bic_swift: Yup.string().required("Il campo è richiesto"),
    });
  }
  if (selectedPaymentEntityType === "individual") {
    if (paymentMethodtype === "regular") {
      return Yup.object().shape({
        beneficiary_first_name: Yup.string().required("Il campo è richiesto"),
        beneficiary_last_name: Yup.string().required("Il campo è richiesto"),
        iban: Yup.string()
          .min(27, "La lunghezza dell'IBAN non è corretta")
          .max(27, "L'IBAN non può essere più lungo di 27 caratteri")
          .required("Il campo è richiesto"),
      });
    }
    return Yup.object().shape({
      beneficiary_first_name: Yup.string().required("Il campo è richiesto"),
      beneficiary_last_name: Yup.string().required("Il campo è richiesto"),
      beneficiary_address: Yup.string().required("Il campo è richiesto"),
      iban: Yup.string()
        .min(27, "La lunghezza dell'IBAN non è corretta")
        .max(27, "L'IBAN non può essere più lungo di 27 caratteri")
        .required("Il campo è richiesto"),
      beneficiary_city: Yup.string().required("Il campo è richiesto"),
      bic_swift: Yup.string().required("Il campo è richiesto"),
    });
  }
};
