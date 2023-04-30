import React , {useEffect} from 'react';
import {Route , Routes , useNavigate} from "react-router-dom";
import Registration from "../authorization/Registration";
import Login from "../authorization/Login";
import EditUser from "../edit-user/EditUser";
import Home from "../home/Home";
import {useDispatch , useSelector} from "react-redux";
import MusicId from "../MusicDir/MusicList/music/MusicId/MusicId";
import UploaderPage from "../uploaders/UploaderPage";
import {auth} from "../../actions/user";
import Recommends from "../MusicDir/Recomends/Recommends";

const AppRouter = () => {
    const dispatch = useDispatch ()
    const isAuth = useSelector(state=>state.user.isAuth)
    const navigate = useNavigate ()

    useEffect( () => {
        dispatch ( auth () )
        if(isAuth){
            navigate("/home")
        } else {
            navigate("/login")
        }
    } , [isAuth])

    return (
        <div>
            { isAuth ?
                <Routes>
                    <Route exact path="/home" element={ <Home/> }/>
                    <Route exact path="/editUser" element={ <EditUser/> }/>
                    <Route path="/upload" element={<UploaderPage/>}/>
                    <Route exact path="/recommends" element={<Recommends/>}/>
                    <Route path="musics/:id" element={<MusicId/>}/>
                </Routes>
                :
                <Routes>
                    <Route path="registration" element={ <Registration/> }/>
                    <Route path="/login" element={ <Login/> }/>
                </Routes>
            }
        </div>
    );
};

export default AppRouter;