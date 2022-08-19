import { useState, useRef, useContext } from "react";
import AuthContext from "../../Context/auth-context";
import { useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import {errorToast } from "../../Services/toast";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevsState) => !prevsState);
  };

  const submitHandler = async (event) => {
    // console.log(event);
    event.preventDefault();
    if (!isLogin) {
      var userName = userNameInputRef.current.value;
    }
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    // donwload maybe joi for validation or create some
    setisLoading(true);
    let url;
    if (isLogin) {
      url = "http://localhost:3001/api/auth";
    } else {
      url = "http://localhost:3001/api/users";
    }

    let body;
    if (isLogin) {
      body = {
        email: email,
        password: password,
      };
    } else {
      body = {
        username: userName,
        email: email,
        password: password,
      };
    }
   
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        },
      });
      setisLoading(false);
      const data = await res.json();
      if (!res.ok) {
        let errorMessage = data;
        errorToast(`${errorMessage}`)
        return
       
      }


      
      if (isLogin) {
        authCtx.login(data);
      } else {
        authCtx.getUser(data.info.username)
        authCtx.login(data.token)
      }
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              ref={userNameInputRef}
              minLength="5"
              maxLength="25"
            />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            ref={passwordInputRef}
            minLength="5"
            maxLength="25"
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p className={classes.loading}>Loading.......</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
