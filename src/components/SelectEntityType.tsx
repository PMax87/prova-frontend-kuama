import React from "react";
import { Select } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import {
  resetPaymentsEntityType,
  setBeneficiaryNameOfField,
  setPaymentEntityType,
} from "../redux/FormDataReducer";


const SelectEntityType= () => {
  const dispatch = useDispatch();

  const paymentsEntityType = useSelector(
    (state: RootState) => state.formData.uniqueEntityType
  );

  const onHandleChangeEntity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      dispatch(resetPaymentsEntityType());
    } else {
      dispatch(setPaymentEntityType(value));
    }
    dispatch(setBeneficiaryNameOfField());
  };

  return (
    <Select
      placeholder="Seleziona un tipo di pagamento"
      onChange={(e) => onHandleChangeEntity(e)}
      className="capitalize"
    >
      {paymentsEntityType.map((entityType, indexEntityType) => {
        return (
          <option className="capitalize" key={indexEntityType}>
            {entityType}
          </option>
        );
      })}
    </Select>
  );
};

export default SelectEntityType;
