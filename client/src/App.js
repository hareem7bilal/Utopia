import Home from "./pages/home/home"
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import Messenger from "./pages/messenger/messenger";
import { AuthContext } from './context/authContext';
import {useContext} from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";



function App() {
  const {user}=useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user?<Home/>:<Login/>}/>
        <Route path="/login" element={user?<Navigate to="/"/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to="/"/>:<Register/>}/>
        <Route path="/messenger" element={user?<Messenger/>:<Navigate to="/"/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>

  )
}
export default App;
