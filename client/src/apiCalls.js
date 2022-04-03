import axios from "axios"

export const loginCall=async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
        const res=await axios.post("/auth/login",userCredentials)
        dispatch({type:"LOGIN_SUCCESS", payload:res.data})
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload:err})
    }
}

export const registerCall = async (userCredentials, navigate) => {
  try {
    await axios.post("/auth/register", userCredentials);
    navigate("/login");
  } catch (err) {
    console.log(err);
  }
};

