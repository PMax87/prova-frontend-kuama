import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataResponse } from "../models/DataResponse";

interface InitialState {
  allFormData: DataResponse[];
  uniquePaymentsType: string[];
  uniqueEntityType: string[];
  costantFieldsOfFrom: string[];
  costantRegularPayments: string[];
}

const initialState: InitialState = {
  allFormData: [],
  uniquePaymentsType: [],
  uniqueEntityType: [],
  costantFieldsOfFrom: [],
  costantRegularPayments: [],
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
  },
});

export const {
  setFormData,
  createUniquePayemntsType,
  createUniqueEntityType,
  setCostantPriorityPaymentsFieldsOfForm,
  setCostantRegularPaymentsFieldsOfForm,
} = formDataFromApiSlice.actions;
export default formDataFromApiSlice.reducer;
