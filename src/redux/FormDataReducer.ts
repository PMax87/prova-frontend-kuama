import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataResponse } from "../models/DataResponse";

interface InitialState {
  allFormData: DataResponse[];
  uniquePaymentsType: string[];
  uniqueEntityType: string[];
  costantFieldsOfFrom: string[];
  costantRegularPayments: string[];
  paymentEntityType: string | undefined;
  paymentMethodType: string | undefined;
  companyNameField: string[];
}

const initialState: InitialState = {
  allFormData: [],
  uniquePaymentsType: [],
  uniqueEntityType: [],
  costantFieldsOfFrom: [],
  costantRegularPayments: [],
  paymentEntityType: undefined,
  paymentMethodType: undefined,
  companyNameField: [],
};

export const formDataFromApiSlice = createSlice({
  name: "formDataFromApi",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<DataResponse[]>) => {
      return { ...state, allFormData: action.payload };
    },
    createUniquePayemntsType: (state) => {
      const tempPaymentsType = Array.from(
        new Set(state.allFormData.map((payment) => payment.payment_type))
      );
      return { ...state, uniquePaymentsType: tempPaymentsType };
    },
    createUniqueEntityType: (state) => {
      const tempEntityType = Array.from(
        new Set(
          state.allFormData.map(
            (entityType) => entityType.beneficiary_entity_type
          )
        )
      );
      return { ...state, uniqueEntityType: tempEntityType };
    },
    setCostantPriorityPaymentsFieldsOfForm: (state) => {
      const tempCostantFieldsOfForm = Array.from(
        Object.keys(state.allFormData[1].fields).slice(1)
      );
      return { ...state, costantFieldsOfFrom: tempCostantFieldsOfForm };
    },
    setCostantRegularPaymentsFieldsOfForm: (state) => {
      const tempRegularPaymentsField = Array.from(
        Object.keys(state.allFormData[2].fields)
      );
      return { ...state, costantRegularPayments: tempRegularPaymentsField };
    },
    setPaymentEntityType: (state, action: PayloadAction<string>) => {
      return { ...state, paymentEntityType: action.payload };
    },
    setPaymentMethodType: (state, action: PayloadAction<string>) => {
      return { ...state, paymentMethodType: action.payload };
    },
    setBeneficiaryNameOfField: (state) => {
      let tempBeneficiaryFields: string[] = [];
      if (state.paymentEntityType === "company") {
        tempBeneficiaryFields = Array.from(
          Object.keys(state.allFormData[1].fields)
        ).splice(0, 1);
      } else {
        tempBeneficiaryFields = Array.from(
          Object.keys(state.allFormData[0].fields)
        );
      }
      return { ...state, companyNameField: tempBeneficiaryFields };
    },
    resetPaymentsEntityType: (state) => {
      return {
        ...state,
        paymentEntityType: undefined,
        paymentMethodType: undefined,
      };
    },
  },
});

export const {
  setFormData,
  createUniquePayemntsType,
  createUniqueEntityType,
  setCostantPriorityPaymentsFieldsOfForm,
  setCostantRegularPaymentsFieldsOfForm,
  setPaymentEntityType,
  setPaymentMethodType,
  setBeneficiaryNameOfField,
  resetPaymentsEntityType,
} = formDataFromApiSlice.actions;
export default formDataFromApiSlice.reducer;
