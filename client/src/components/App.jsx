import Navbar from "./navbar/Navbar";
import {BrowserRouter , Route , Routes } from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch , useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "../actions/user";
import MusicDir from "./MusicDir/MusicDir";
import EditUser from "./edit-user/EditUser";

const App = () => {
    const isAuth = useSelector ( state => state.user.isAuth )
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(auth())
    },[])

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                {!isAuth ?
                    <Routes>
                        <Route path="/registration" element={ <Registration/> }/>
                        <Route path="/login" element={ <Login/> }/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/"  element={<MusicDir/>}/>
                        <Route path="/editUser"  element={<EditUser/>}/>
                    </Routes>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
