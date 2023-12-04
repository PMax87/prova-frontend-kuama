export interface DataResponse {
  payment_type: string;
  beneficiary_entity_type: string;
  fields: {
    beneficiary_last_name?: string;
    beneficiary_address?: string;
    iban: string;
    beneficiary_city?: string;
    beneficiary_first_name?: string;
    bic_swift?: string;
    beneficiary_company_name?: string;
  };
}
