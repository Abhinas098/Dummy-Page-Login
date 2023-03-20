import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const reduseEmail = (state, action) => {
  if (action.type === "Input-Value") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "Blur-Input") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const redusePassword = (state, action) => {
  if (action.type === "Input-Password") {
    return { value: action.value, isValid: action.value.trim().length >= 6 };
  }
  if (action.type === "Input-Blur") {
    return { value: state.value, isValid: state.value.trim().length >= 6 };
  }
  return { value: "", isValid: false };
};

const reduseClg = (state, action) => {
  if (action.type === "Input-ClgName") {
    return { value: action.val, isValid: action.val.trim().length >= 1 };
  }
  if (action.type === "Clg-Blur") {
    return { value: state.value, isValid: state.value.trim().length >= 1 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredClg, setEnteredClg] = useState("");
  // const [clgIsValid, setClgValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispadchEmail] = useReducer(reduseEmail, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(redusePassword, {
    value: "",
    isValid: null,
  });

  const [clgState, dispatchClg] = useReducer(reduseClg, {
    value: "",
    isValid: null,
  });
  
  const { isValid: emailValidated } = emailState;
  const { isValid: passwordValidated } = passwordState;
  const { isValid: clgValidated } = clgState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("hii");
      setFormIsValid(emailValidated && passwordValidated && clgValidated);
    }, 100);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailValidated, passwordValidated, clgValidated]);
  const emailChangeHandler = (event) => {
    dispadchEmail({ type: "Input-Value", val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && clgState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "Input-Password", value: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && clgState.isValid
    // );
  };

  const collegeChangeHandler = (event) => {
    dispatchClg({ type: "Input-ClgName", val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && clgState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispadchEmail({ type: "Blur-Input" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "Input-Blur" });
  };
  const validateCollegeHandler = () => {
    dispatchClg({ type: "Clg-Blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, clgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            clgState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="College">College</label>
          <input
            type="text"
            id="clg"
            value={clgState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
