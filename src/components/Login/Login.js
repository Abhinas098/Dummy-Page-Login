import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Context/AuthContext";
import Input from "../UI/Input/Input";

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

  const authCtx = useContext(AuthContext);

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
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "Input-Password", value: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    dispatchClg({ type: "Input-ClgName", val: event.target.value });
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
    authCtx.onLogin(emailState.value, passwordState.value, clgState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailValidated}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordValidated}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <Input
          id="clg"
          label="College"
          type="text"
          isValid={clgValidated}
          value={clgState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />

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
