import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { setPaymentMethodType } from "../redux/FormDataReducer";

const PaymentsMethodTab = () => {
  const dispatch = useDispatch();

  const paymentsType = useSelector(
    (state: RootState) => state.formData.uniquePaymentsType
  );

  const onHandleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const value = (e.target as HTMLDivElement).textContent;
    dispatch(setPaymentMethodType(value as string));
  };

  return (
    <Tabs
      onClick={(e) => onHandleTabChange(e)}
      className="w-full"
      position="relative"
      variant="unstyled"
    >
      <TabList>
        {paymentsType.map((paymentType, index) => {
          return (
            <Tab key={index} className="capitalize w-1/2">
              {paymentType}
            </Tab>
          );
        })}
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="pink.600" borderRadius="1px" />
    </Tabs>
  );
};

export default PaymentsMethodTab;
