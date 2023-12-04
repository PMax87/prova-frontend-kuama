import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataResponse } from "../models/DataResponse";

interface InitialState {
  allFormData: DataResponse[];
  uniquePaymentsType: string[];
  uniqueEntityType: string[];
}

const initialState: InitialState = {
  allFormData: [],
  uniquePaymentsType: [],
  uniqueEntityType: [],
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
  },
});

export const { setFormData, createUniquePayemntsType, createUniqueEntityType } =
  formDataFromApiSlice.actions;
export default formDataFromApiSlice.reducer;
