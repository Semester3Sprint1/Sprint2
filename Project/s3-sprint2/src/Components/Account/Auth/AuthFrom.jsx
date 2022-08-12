import {useState, useRef, useContext} from 'react'
import AuthContext from '../../Context/auth-context';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css'
const AuthForm = () =>{

const navigate = useNavigate();
const emailInputRef = useRef();
const passwordInputRef = useRef();
const userNameInputRef = useRef();
const authCtx = useContext(AuthContext)
const [isLogin, setIsLogin] = useState(true);
const [isLoading, setisLoading] = useState(false)

const switchAuthModeHandler = () =>{
    setIsLogin((prevsState) => !prevsState)
}

const submitHandler = (event) =>{
    event.preventDefault();
    const userName = (userNameInputRef.current.value) 
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    // donwload maybe joi for validation or create some
    setisLoading(true);
    let url;
    if(isLogin){
        url = 'http://localhost:3001/api/auth'
    } else{
        url= "http://localhost:3001/api/users"
    }

    let body;
    if(isLogin){
        body = {               
        email: email,
        password:password,               

        }
    } else{
        body = {
            username: userName,    
            email: email,
            password:password, }
    }

    fetch(url, {

        method: "POST",
        body: JSON.stringify(body),
        headers:{
            "Content-Type": "application/json",   
        }, 

    })
    .then((res) =>{
        setisLoading(false);
        if(res.ok){
            return res.json();
        }else{
            return res.json().then((data) =>{
                let errorMessage = "Authentication Fails!";
                if(data && data.error && data.error.message){
                    errorMessage = data.error.message
                }
                throw new Error(errorMessage)
            });
        }
    }).then((data) =>{
        authCtx.login(data._id);
        navigate("/", { replace:true});
        // add sucessfull Responce Maybe use toast
    }).catch((err) =>{
        alert(err.message)
    });
}

return (
    <section className= {classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
        {!isLogin &&  <div className={classes.control}>
            
            <label htmlFor='username'>UserName</label>
            <input type ="text" id="username" name = "username" required ref = {userNameInputRef} minLength = "5"  maxLength="25" />
        </div>}
        
            <div className={classes.control}>
                <label htmlFor='email'>You Email</label>
                <input type ="email" id="email" name = "email" required ref = {emailInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input 
                type = "password"
                name = "password"
                id= "password"
                required ref = {passwordInputRef}
                minLength = "5"
                maxLength="25" />  
            </div>
            <div className={classes.actions}>
                {!isLoading &&(
                    <button>{isLogin ? "Login" : "Create Account"}</button>
                )}
                {isLoading && <p className={classes.loading}>Loading.......</p>}
                <button
                type = "button"
                className={classes.toggle}
                onClick = {switchAuthModeHandler} >
                    {isLogin ? "Create new account" : "Login with existing account"}
                </button>
            </div>
        </form>
    </section>
);
}
export default AuthForm