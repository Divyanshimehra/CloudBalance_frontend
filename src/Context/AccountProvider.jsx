import { useReducer } from "react";
import { AccountContext } from "./AccountContext";

const initialState = {
  currentIndex: 0,
  step1: {
    accountId: "",
    accountName: "",
    arn: "",
  }
};

function accountReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_INDEX":
      return { ...state, currentIndex: action.payload };

    case "UPDATE_STEP1_FIELD":
      return {
        ...state,
        step1: {
          ...state.step1,
          [action.payload.fieldName]: action.payload.value,
        },
      };

    case "RESET":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
}

export default function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
}
