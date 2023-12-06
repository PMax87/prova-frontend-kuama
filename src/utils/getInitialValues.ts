export interface InitialValues {
  beneficiary_company_name?: string;
  beneficiary_first_name?: string;
  beneficiary_last_name?: string;
  beneficiary_address?: string;
  iban?: string;
  beneficiary_city?: string;
  bic_swift?: string;
  [key: string]: string | number | boolean | undefined;
}

export const getInitialValues = (
  selectedEntityType: string,
  paymentsType: string
): InitialValues => {
  if (selectedEntityType === "company") {
    if (paymentsType === "regular") {
      return {
        iban: "",
      };
    }
    return {
      beneficiary_company_name: "",
      beneficiary_address: "",
      iban: "",
      beneficiary_city: "",
      bic_swift: "",
    };
  }
  if (selectedEntityType === "individual") {
    if (paymentsType === "regular") {
      return {
        iban: "",
      };
    }
    return {
      beneficiary_first_name: "",
      beneficiary_last_name: "",
      beneficiary_address: "",
      iban: "",
      beneficiary_city: "",
      bic_swift: "",
    };
  }
  return {};
};
