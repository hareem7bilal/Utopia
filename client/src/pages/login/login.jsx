import './login.css'
import {useRef,useContext} from "react"
import {loginCall} from '../../apiCalls'
import { AuthContext } from '../../context/authContext';
import { CircularProgress } from '@mui/material';


function Login() {

    const Email=useRef();
    const Pwd=useRef();
    const {isFetching, dispatch}=useContext(AuthContext)
   

    const handleClick=(e)=>{
        e.preventDefault();
        const user={
            email:Email.current.value,
            password:Pwd.current.value,
        }
        loginCall(user,dispatch)
    }


    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Utopia</h3>
                    <span className="loginDesc">Reach out to the world with Utopia.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" ref={Email} required/>
                        <input placeholder="Password" type="password" className="loginInput" ref={Pwd} minLength="8" required/>
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?<CircularProgress style={{'color': 'white'}} size={23}/>:"Log in"}</button>
                        <span className="forgotPwd">Forgot Password?</span>
                        <button className="loginregisterButton">{isFetching?<CircularProgress style={{'color': 'white'}} size={23}/>:"Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>    
    )
}

export default Login
