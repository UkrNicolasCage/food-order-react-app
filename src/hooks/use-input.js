import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT": {
     return {
       value: action.value,
       isTouched: state.isTouched,
     };
    }
    case "BLUR": {
      return {
        value: state.value,
        isTouched: true,
      };
    }
    case "RESET": {
      return initialInputState;
    }
    default:
      return {
        value: "",
        isTouched: false,
      };
  }
};

const useInput = (validationFn) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valIsValid = validationFn(inputState.value);
  const hasError = !valIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
