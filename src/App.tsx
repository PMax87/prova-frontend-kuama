import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createUniquePayemntsType,
  setFormData,
  createUniqueEntityType,
} from "./redux/FormDataReducer";
import details from "./data";
import { useSelector } from "react-redux";
import { RootState } from "./redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (details) {
      dispatch(setFormData(details));
      dispatch(createUniquePayemntsType());
      dispatch(createUniqueEntityType());
    }
  }, [dispatch]);

  const uniquePaymentsType = useSelector(
    (state: RootState) => state.formData.uniqueEntityType
  );

  console.log(uniquePaymentsType);

  return (
    <>
      {" "}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
