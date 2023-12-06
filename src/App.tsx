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
import { CustomForm } from "./components";

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
    <div className="flex justify-center items-center h-[100vh]">
      <CustomForm />
    </div>
  );
}

export default App;
