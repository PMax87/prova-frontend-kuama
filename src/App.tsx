import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createUniquePayemntsType,
  setFormData,
  createUniqueEntityType,
  setCostantPriorityPaymentsFieldsOfForm,
  setCostantRegularPaymentsFieldsOfForm,
} from "./redux/FormDataReducer";
import details from "./data";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (details) {
      dispatch(setFormData(details));
      dispatch(createUniquePayemntsType());
      dispatch(createUniqueEntityType());
      dispatch(setCostantPriorityPaymentsFieldsOfForm());
      dispatch(setCostantRegularPaymentsFieldsOfForm());
    }
  }, [dispatch]);

  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
