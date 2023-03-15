import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && inputTouched;

  const enteredEmailIsValid = enteredEmail.toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const emailInputIsInvalid = !enteredEmailIsValid && inputTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (nameEvent) => {
    setEnteredName(nameEvent.target.value);
  };

  const emailInputChangeHandler = (emailEvent) => {
    setEnteredEmail(emailEvent.target.value);
  };

  const inputBlurHandler = () => {
    setInputTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setInputTouched(true);

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    // nameInputRef.current.value = ""; BAD PRACTICE AS IT MANIPULATE THE DOM
    setEnteredName("");
    setEnteredEmail("");
    setInputTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredName}
        />
      </div>
      {nameInputIsInvalid && (
        <p className='error-text'>This field cannot be empty</p>
      )}
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your e-mail</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={inputBlurHandler}
          value={enteredEmail}
        />
      </div>
      {emailInputIsInvalid && (
        <p className='error-text'>Please enter a valid email</p>
      )}
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
