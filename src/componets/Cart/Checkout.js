import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const Checkout = (props) => {
  const validationFN = (value) =>
    value.trim() !== "" && value.trim().length > 3;
  const {
    value: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(validationFN);

  const {
    value: street,
    hasError: streetHasError,
    isValid: streetIsValid,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(validationFN);
  const {
    value: postal,
    hasError: postalHasError,
    isValid: postalIsValid,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(validationFN);

  const {
    value: city,
    hasError: cityHasError,
    isValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(validationFN);

  const formIsValid =
    cityIsValid && postalIsValid && streetIsValid && nameIsValid;

  const setClasses = (hasError) => {
    return hasError
      ? [classes["control"], classes["invalid"]]
      : [classes["control"]];
  };
  const nameClasses = setClasses(nameHasError);
  const postalClasses = setClasses(postalHasError);
  const streetClasses = setClasses(streetHasError);
  const cityClasses = setClasses(cityHasError);

  const confirmHandler = (event) => {
    event.preventDefault();
    props.onSubmit({
      name,
      street,
      city,
      postal,
    });
    resetName();
    resetCity();
    resetPostal();
    resetStreet();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${nameClasses[0]} ${nameClasses[1]}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={`${streetClasses[0]} ${streetClasses[1]}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      <div className={`${postalClasses[0]} ${postalClasses[1]}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
      </div>
      <div className={`${cityClasses[0]} ${cityClasses[1]}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
