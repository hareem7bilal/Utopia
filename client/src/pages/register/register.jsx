import './register.css';
import {useRef} from "react";
import {registerCall} from '../../apiCalls'
import {useNavigate} from "react-router";

function Register() {
    const Username=useRef();
    const Email=useRef();
    const Pwd=useRef();
    const PwdAgain=useRef();
    let navigate=useNavigate();
  

    const handleClick=async(e)=>{
        e.preventDefault();
        if(PwdAgain.current.value!==Pwd.current.value){
            Pwd.current.setCustomValidity("Passwords don't match!")
        }else{
            const user={
                username:Username.current.value,
                email:Email.current.value,
                password:Pwd.current.value,
            }
            registerCall(user,navigate)      
        }
    }

    return (
        <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">Utopia</h3>
                <span className="registerDesc">Reach out to the world with Utopia.</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleClick}>
                    <input placeholder="Username" className="registerInput" ref={Username} required/>
                    <input placeholder="Email" type="email" className="registerInput" ref={Email} required/>
                    <input placeholder="Password" type="password" className="registerInput" ref={Pwd} minLength="8" required/>
                    <input placeholder="Password Again" type="password" className="registerInput" ref={PwdAgain} minLength="8" required/>
                    <button className="registerButton" type="submit">Sign Up</button>
                    <button className="registerloginButton">Log into Your Account</button>
                </form>
            </div>
        </div>
    </div>    
    )
}

export default Register
