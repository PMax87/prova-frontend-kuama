import * as Yup from "yup";

export const getValidationSchema = () => {
  const validationSchema = Yup.object().shape({
    beneficiary_company_name: Yup.string().required("Il campo è richesto"),
    beneficiary_address: Yup.string().required("Il campo è richesto"),
    iban: Yup.string()
      .min(27, "La lunghezza dell IBAN non è corretta")
      .required("Il campo è richesto"),
    beneficiary_city: Yup.string().required("Il campo è richesto"),
    bic_swift: Yup.string().required("Il campo è richesto"),
  });
  return validationSchema;
};
